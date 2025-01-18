import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getFeed = async () => {
    if (feed) return;
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
      setError(null);
    } catch (err) {
      console.error("Error fetching feed:", err);
      setError("Failed to load feed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return <h1 className="flex justify-center my-10">Loading feed...</h1>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center my-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">Oops!</h1>
        <p className="text-gray-600">
          Something went wrong while loading the feed.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          onClick={getFeed}
          disabled={loading}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!feed) return null;

  if (feed.length === 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;

  return (
    <div className="flex justify-center my-10">
      <UserCard feed={feed[0]} />
    </div>
  );
};

export default Feed;
