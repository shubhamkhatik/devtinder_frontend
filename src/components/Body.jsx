import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getUserByToken = async () => {
    try {
      const res = await axios.get(BASE_URL +"/auth/me",{
        withCredentials: true
      });
      dispatch(addUser(res.data.data));
    } catch (error) {
      console.error("Authentication failed:", error);
      dispatch(addUser(null));
      navigate("/login");
    }
  };

  useEffect(() => {
    // Check if we're not on login page and user is null
    if (!user && !window.location.pathname.includes("/login")) {
      getUserByToken();
    }
  }, [user]); // Add user back to dependency array

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
