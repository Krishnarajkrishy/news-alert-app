import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState(["sports", "technology"]);
  const [frequency, setFrequency] = useState("hourly");
  const [notifications, setNotifications] = useState(["email"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preferences = { categories, frequency, notifications };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/news/subscribe",
        { email, preferences }
      );
      console.log("user subscribed", response.data);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Subscribe to News Alerts</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <div className="mb-4">
            <label className="block mb-2">Choose Categories</label>
            <select
              multiple
              value={categories}
              onChange={(e) =>
                setCategories(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
              <option value="politics">Politics</option>
              <option value="business">Business</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="immediate">Immediate</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Notifications</label>
            <input
              type="checkbox"
              checked={notifications.includes("email")}
              onChange={() =>
                setNotifications(
                  notifications.includes("email") ? [] : ["email"]
                )
              }
            />
            Email
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
