import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import useToast from "../hooks/useToast";
import Toast from "./Toast";

const UserCard = ({ feed }) => {
  if (!feed) {
    return null;
  }
  const { toast, showToast } = useToast();

  const { _id, firstName, lastName, photoUrl, age, gender, about } = feed;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      showToast(`Request ${status} successfully!`, "success");
    } catch (err) {
      console.error("Error sending request:", err);
      showToast("Failed to send request. Please try again.", "error");
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-full max-w-md shadow-xl">
        <figure className="relative h-48 sm:h-56">
          <img
            src={photoUrl}
            alt="photo"
            className="w-full h-full object-cover object-center"
          />
        </figure>
        <div className="card-body p-3 sm:p-4">
          <h2 className="card-title text-lg">{`${firstName} ${lastName}`}</h2>
          {age && gender && (
            <p className="text-sm text-gray-600">{`${age}, ${gender}`}</p>
          )}
          <p className="text-sm text-gray-700 line-clamp-2">{about}</p>
          <div className="card-actions justify-center gap-2 mt-2">
            <button
              className={`btn btn-sm btn-secondary flex-1 ${
                _id ? "" : "cursor-not-allowed opacity-50"
              }`}
              onClick={() => _id && handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className={`btn btn-sm btn-primary flex-1 ${
                _id ? "" : "cursor-not-allowed opacity-50"
              }`}
              onClick={() => _id && handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
      {toast && <Toast toast={toast} />}
    </>
  );
};

export default UserCard;
