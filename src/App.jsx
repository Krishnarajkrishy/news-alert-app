import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Loginpage from "./Components/Loginpage";
import NavigationBar from "./Components/NavigationBar";
import NewsList from "./Components/NewsList";
import FavoritesPage from "./Components/FavoritesPage";
import Home from "./Components/Home";
import SigninHome from "./Components/SigninHome";
import Subscriptionpage from "./Components/SubscriptionPage"

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const removeToFavorite = (id) => {
  console.log(`Removing item with id: ${id} from favorites`);
};


const App = () => {
  return (
    <div className="container mx-auto shadow-lg">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Loginpage />} />
        <Route
          path="/signin-home"
          element={
            <ProtectedRoute>
              <SigninHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news-list"
          element={
            <ProtectedRoute>
              <NewsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscriptionpage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage removeToFavorite={removeToFavorite} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;