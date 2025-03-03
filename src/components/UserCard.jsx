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
    console.log("status", userId);
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      showToast(`Request ${status} successfully!`, "success");
    } catch (err) {
      console.error("Error sending request:", err)
      showToast("Failed to send request. Please try again.", "error");
    }
  };

  return (
    <>
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        {age && gender && <p>{`${age}, ${gender}`}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className={`btn btn-secondary ${_id ? "" : "cursor-not-allowed"}`}
            onClick={() => _id && handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className={`btn btn-secondary ${_id ? "" : "cursor-not-allowed"}`}
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
