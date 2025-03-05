import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import axios from "../utils/axios-config";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getUserByToken = async () => {
    try {
      const res = await axios.get("/auth/me");
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
