import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect } from "react";
import Toast from "./Toast";
import useToast from "../hooks/useToast";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();
  const { toast, showToast } = useToast();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      showToast(`Request ${status} successfully!`, "success");
    } catch (err) {
      showToast("Failed to process the request. Please try again.", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
      showToast(`Failed to fetch requests`, "error");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const requestsList = requests || [];

  if (requestsList.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex items-center gap-6 p-6 rounded-xl bg-base-300 w-full max-w-3xl mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                alt="photo"
                className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                src={photoUrl}
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-500 rounded-full border-2 border-base-300"></div>
            </div>

            <div className="flex-1 text-left">
              <h2 className="font-bold text-xl text-white mb-1">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-gray-400 text-sm mb-2">
                  {age + ", " + gender}
                </p>
              )}
              <p className="text-gray-300 line-clamp-2">{about}</p>
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-error min-w-[100px] hover:scale-105 transition-transform duration-200"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-success min-w-[100px] hover:scale-105 transition-transform duration-200"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}

      {toast && <Toast toast={toast} />}
    </div>
  );
};
export default Requests;
