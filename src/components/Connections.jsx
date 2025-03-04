import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const connectionList = connections || [];
  // undefined || [] ==> goes to []

  if (connectionList.length === 0) {
    return (
      <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">No Connections found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Connections
      </h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

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
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-base-300"></div>
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

            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary min-w-[100px] hover:scale-105 transition-transform duration-200">
                Chat
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
