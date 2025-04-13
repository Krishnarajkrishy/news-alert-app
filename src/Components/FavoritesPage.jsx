import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = localStorage.getItem("userId"); 
        const res = await axios.get(
          `https://news-server-1-vz31.onrender.com/api/favorites/${userId}`
        );
        setFavorites(res.data);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`https://news-server-1-vz31.onrender.com/api/favorites/${id}`);
      setFavorites((prev) => prev.filter((fav) => fav._id !== id));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <h2 className="text-center text-4xl font-bold font-serif mb-6">
        Your{" "}
        <span className="px-4 py-2 font-semibold text-white bg-red-600 rounded-2xl">
          Favorites
        </span>
      </h2>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div
              key={favorite._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 relative"
            >
              <button
                onClick={() => removeFavorite(favorite._id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
              >
                <FaHeart className="text-red-600" />
              </button>
              <img
                src={
                  favorite.news.urlToImage || "https://via.placeholder.com/400"
                }
                alt={favorite.news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{favorite.news.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {favorite.news.description
                    ? favorite.news.description.slice(0, 100) + "..."
                    : "No description available."}
                </p>
                <a
                  href={favorite.news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
                >
                  Read More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No favorite articles yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
