import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "./LoadingPage";

const Loginpage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
   const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(
        "https://news-server-1-vz31.onrender.com/api/auth/login",
        loginData
      );
      console.log("Raw response:", response);
      console.log("Response data:", response.data);

      if (response.data.message === "Login successful") {
        toast.success("Login successful! Redirecting...");
        localStorage.setItem("token", "user logged in");
        localStorage.setItem("userId", response.data.userId);
        console.log(
          "Logged in successfully, userId saved to localStorage:",
          response.data.userId
        );
        setTimeout(() => navigate("/signin-home"), 2000);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false)
    }
    
  };
   if(loading) return <LoadingPage/>
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-full max-w-md p-6 bg-white border-2 border-gray-300 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-500 text-center">
            Login
          </h2>

          <label className="text-lg font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            id="email"
          />

          <label className="text-lg font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            id="password"
          />

          <button
            className="w-full bg-blue-500 text-white py-3 text-lg rounded-lg hover:cursor-pointer hover:bg-blue-600 transition-all duration-300"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;
