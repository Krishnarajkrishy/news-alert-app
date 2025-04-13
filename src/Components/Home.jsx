import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold font-serif text-gray-800">
        Welcome to <span className="text-red-600">News Portal</span>
      </h1>
      <p className="text-gray-600 text-lg md:text-xl mt-4 max-w-2xl">
        Stay informed with real-time updates from around the world. Explore the
        latest news across various categories.
      </p>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800">Why Sign Up?</h2>
        <ul className="text-gray-600 mt-2 space-y-2 text-lg">
          <li>✅ Get personalized news updates</li>
          <li>✅ Save your favorite articles</li>
          <li>✅ Receive instant alerts on breaking news</li>
        </ul>
        <Link
          to="/register"
          className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-green-700 transition"
        >
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
