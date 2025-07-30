import axios from "axios";
import { useState } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "./LoadingPage";

const options = [
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
  { value: "politics", label: "Politics" },
  { value: "business", label: "Business" },
];

const SubscriptionPage = () => {
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState([]);
  const [frequency, setFrequency] = useState("hourly");
  const [notifications, setNotifications] = useState(["email"]);
  const [loading,setLoading] = useState(false)

  const handleChange = (selectedCategories) => {
    setCategories(selectedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const preferences = {
      categories: categories.map((cat) => cat.value),
      frequency,
      notifications,
    };
    try {
      await axios.post(
        "https://news-server-1-vz31.onrender.com/alert/subscribe",
        { email, preferences },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Successfully subscribed to news alerts!");
      setEmail("");
      setCategories([]);
      setFrequency("hourly");
      setNotifications(["email"]);
    } catch (error) {
      toast.error("Error subscribing. Please try again!");
    } finally {
      setLoading(false)
    }
  };
  if(loading) return <LoadingPage/>
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Subscribe to News Alerts
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div>
            <label className="block mb-2 font-semibold">
              Choose Categories
            </label>
            <Select
              options={options}
              value={categories}
              onChange={handleChange}
              isMulti
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="immediate">Immediate</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">
              Notification Type
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifications.includes("email")}
                onChange={() =>
                  setNotifications((prev) =>
                    prev.includes("email")
                      ? prev.filter((notif) => notif !== "email")
                      : [...prev, "email"]
                  )
                }
                className="w-4 h-4"
              />
              <label>Email</label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPage;
