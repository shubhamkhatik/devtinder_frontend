import { useEffect, useState, useRef, useCallback } from "react";

import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import TimeAgo from "../utils/timeAgo";

const Chat = () => {
  const { targetUserId } = useParams();
  const [friendWarn, setFriendWarn] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Ref for auto-scroll
  const messagesEndRef = useRef(null);

  // Fetch chat messages for a given page (default 1)
  const fetchChatMessages = useCallback(
    async (fetchPage = 1) => {
      setIsLoading(true);
      try {
        const chat = await axios.get(
          `${BASE_URL}/chat/${targetUserId}?page=${fetchPage}&limit=10`,
          {
            withCredentials: true,
          }
        );
        const chatMessages = chat?.data?.messages.map((msg) => {
          const { senderId, text, updatedAt } = msg;
          return {
            firstName: senderId?.firstName,
            lastName: senderId?.lastName,
            text,
            updatedAt,
          };
        });
        setTotalPages(chat?.data?.pagination?.totalPages || 1);
        setPage(fetchPage);
        if (fetchPage === 1) {
          setMessages(chatMessages);
        } else {
          setMessages((prev) => [...chatMessages, ...prev]);
        }
      } catch (err) {
        console.error("Error fetching chat messages:", err);
        setFriendWarn("Failed to load messages. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [targetUserId]
  );

  useEffect(() => {
    fetchChatMessages(1);
  }, [fetchChatMessages]);

  // Auto-scroll to bottom when messages change (only on new message, not on pagination)
  useEffect(() => {
    if (messagesEndRef.current && page === 1) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, page]);
  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, updatedAt }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, updatedAt },
      ]);
    });

    socket.on("notFriendsWarning", ({ message }) => {
      setFriendWarn(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user.firstName]);
  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Handler for scroll event to load more messages when scrolled to top
  const chatContainerRef = useRef(null);
  const handleScroll = async () => {
    if (!chatContainerRef.current || isLoading) return;
    if (chatContainerRef.current.scrollTop === 0 && page < totalPages) {
      const prevHeight = chatContainerRef.current.scrollHeight;
      await fetchChatMessages(page + 1);
      // After loading, maintain scroll position
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight - prevHeight;
        }
      }, 100);
    }
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      {friendWarn && (
        <p className="text-red-500 text-center p-2">{friendWarn}</p>
      )}
      <div
        className="flex-1 overflow-scroll p-5"
        ref={chatContainerRef}
        onScroll={handleScroll}
        style={{ overflowY: "auto" }}
      >
        {isLoading && page > 1 && (
          <div className="text-center text-xs text-gray-400 mb-2">
            Loading...
          </div>
        )}
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName} `}
                <TimeAgo isoDate={msg.updatedAt} />
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
        {/* Dummy div for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onKeyDown={handleKeyDown}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
