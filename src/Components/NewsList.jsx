import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LoadingPage from "./LoadingPage";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("general");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPage, setTotalPage] = useState(1);

  const userId = localStorage.getItem("userId");
  const[loading,setLoading]= useState(false)

  // Fetch News Articles
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://news-server-1-vz31.onrender.com/api/news?category=${category}&page=${page}&pageSize=${pageSize}`
        );
        setArticles(response.data.articles || []);
        setTotalPage(response.data.totalPages || 1);
      } catch (e) {
        console.error("Error fetching news:", e);
      } finally {
        setLoading(false)
      }
    };
    fetchNews();
  }, [category, page]);

  // Fetch User Favorites
  const fetchFavorites = async () => {
    setLoading(true)
    if (!userId) return;
    try {
      const res = await axios.get(
        `https://news-server-1-vz31.onrender.com/api/favorites/${userId}`
      );
      setFavorites(res.data);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    } finally {
      setLoading(false)
    }
  };

 useEffect(() => {
   const loadFavorites = async () => {
     setLoading(true);
     await fetchFavorites(); 
     setLoading(false);
   };

   if (userId) {
     loadFavorites();
   }
 }, [userId]);

  const toggleFavorite = async (news) => {
    if (!userId) {
      alert("Please log in to favorite articles.");
      return;
    }

    const isFavorited = favorites.some(
      (fav) => fav.news && fav.news.url === news.url
    );

    try {
      if (isFavorited) {
        const favToRemove = favorites.find(
          (fav) => fav.news && fav.news.url === news.url
        );
        if (!favToRemove) return;

        await axios.delete(
          `https://news-server-1-vz31.onrender.com/api/favorites/${favToRemove._id}`
        );
        fetchFavorites();
      } else {
        await axios.post("https://news-server-1-vz31.onrender.com/api/favorites", {
          userId,
          news,
        });
        
        fetchFavorites();
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPage) setPage((prev) => prev + 1);
  };
  if(loading) return <LoadingPage/>
  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <h2 className="text-center text-4xl font-extrabold font-serif mt-8">
        Latest
        <span className="px-4 py-2 font-semibold text-white bg-red-600 rounded-full">
          News
        </span>
      </h2>

      {/* Category Selector */}
      <div className="flex flex-wrap justify-center gap-3 px-6 py-4 bg-white shadow-md rounded-lg mx-auto max-w-4xl">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition ${
              category === cat
                ? "bg-red-600 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => {
              setCategory(cat);
              setPage(1);
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* News Cards */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 mt-8">
        {articles.length > 0 ? (
          articles.map((news, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 relative"
            >
              <button
                onClick={() => toggleFavorite(news)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition"
              >
                {favorites.some(
                  (fav) => fav.news && fav.news.url === news.url
                ) ? (
                  <FaHeart className="text-red-600 text-xl" />
                ) : (
                  <FaRegHeart className="text-gray-400 text-xl" />
                )}
              </button>

              <img
                src={news.urlToImage || "https://via.placeholder.com/400"}
                alt={news.title}
                className="w-full h-56 object-cover rounded-t-xl"
              />

              <div className="p-5 flex flex-col space-y-3">
                <h3 className="text-lg font-semibold line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {news.description || "No description available."}
                </p>

                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-center mt-3 px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
                >
                  Read More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full text-lg">
            No articles found for "{category}"
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-500 text-gray-100 rounded disabled:opacity-50 hover:cursor-pointer"
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {page} of {totalPage}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPage}
          className="px-4 py-2 bg-gray-500 text-gray-100 rounded disabled:opacity-50 hover:cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsList;
