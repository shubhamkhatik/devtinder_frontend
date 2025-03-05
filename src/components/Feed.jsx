import axios from "../utils/axios-config";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";


const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed) return;
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response has data
      if (res?.data?.data) {
        dispatch(addFeed(res.data.data));
        setError(null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching feed:", err);

      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        switch (err.response.status) {
          case 401:
            // Unauthorized - token missing or invalid
            setError("Your session has expired. Please login again.");
            // Optionally redirect to login
            setTimeout(() => navigate("/login"), 2000);
            break;
          case 403:
            setError("You don't have permission to access this resource.");
            break;
          case 404:
            setError("Feed not found.");
            break;
          default:
            setError(
              err.response.data.message ||
                "Failed to load feed. Please try again later."
            );
        }
      } else if (err.request) {
        // Request was made but no response received
        setError("No response from server. Please check your connection.");
      } else {
        // Something else went wrong
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h1 className="text-2xl font-bold text-error mb-4">Oops!</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          className="btn btn-primary"
          onClick={getFeed}
          disabled={loading}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!feed) return null;

  if (feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h1 className="text-2xl font-bold mb-4">No New Users Found</h1>
        <p className="text-gray-600">Check back later for new connections!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <UserCard feed={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
