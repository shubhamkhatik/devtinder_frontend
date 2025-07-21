import React from "react";
import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600 ">
      <div className="p-5 border-2 border-red-600 text-center rounded-lg bg-gray-800">
        <h1 className="text-4xl font-bold text-gray-400 mb-4">404</h1>
        <p className="text-lg text-gray-400">Page Not Found</p>
      </div>
      <Link
        to="/"
        className="mt-4 text-blue-500 hover:underline hover:text-white"
      >
        Go back to Home
      </Link>
      <Link
        to="/login"
        className="mt-4 text-blue-500 hover:underline hover:text-white"
      >
        login here
      </Link>
    </div>
  );
};

export default PageNotFound;
