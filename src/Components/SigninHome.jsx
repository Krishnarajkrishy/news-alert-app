import React from "react";
import { Link } from "react-router-dom";

const SigninHome = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center text-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-gray-800">
          Stay Updated with the{" "}
          <span className="text-red-600">Latest News</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mt-4">
          Get real-time news updates from around the world. Stay informed, stay
          ahead.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        <Link
          to="/news-list"
          className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition"
        >
          Go to News Page
        </Link>

        <Link
          to="/subscription"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Subscribe for Alerts
        </Link>
      </div>
    </div>
  );
};

export default SigninHome;
