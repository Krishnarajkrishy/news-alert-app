import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://news-server-1-vz31.onrender.com/api/auth/signup",
        formData
      );

      if (response.data.message === "Signup successful") {
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Signup failed! Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-full max-w-md p-6 bg-white border-2 border-gray-300 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-500 text-center">
            Sign Up
          </h2>

          <label className="text-lg font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            id="name"
          />

          <label className="text-lg font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            required
            id="password"
          />

          <button
            className="w-full bg-blue-500 text-white py-3 text-lg hover:cursor-pointer rounded-lg hover:bg-blue-600 transition-all duration-300"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
