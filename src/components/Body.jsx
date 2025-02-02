import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getUserByToken = async () => {
    try {
      //insted we can use profile/view api to get user
      const res = await axios.get(BASE_URL + "/auth/me", {
        withCredentials: true,
      }); 
      dispatch(addUser(res.data.data)); 
    } catch (error) {
      console.error("Authentication failed:", error);
      dispatch(addUser(null));
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      getUserByToken();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
