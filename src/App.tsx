import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Landing_page from "./pages/Landing_page";
import Home from "./pages/Home/Home";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SignIn from "./auth/forms/SignIn";
import Register from "./auth/forms/Register";
import { RouteLayout } from "./pages/RouteLayout";
import Explore from "./pages/Explore";
import People from "./pages/People";
import SavedPost from "./pages/SavedPost";
import CreatePost from "./pages/CreatePost";
import { useUser } from "./components/UserContext";
import { jwtDecode } from "jwt-decode";
import ViewProfile from "./pages/ViewProfile/ViewProfile";
import { useAuth } from "./components/AuthContext";
import Notification from "./pages/Notification";

function App() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    const accessTokenString = localStorage.getItem("Token :");
    if (accessTokenString !== null) {
      // Decode the JWT token
      const decodedToken = jwtDecode(accessTokenString);

      // Log the decoded token to inspect its structure
      console.log(decodedToken);

      // Access the user ID from the decoded token using the correct property name
      const userId = (decodedToken as { userId: string }).userId;
      setUser(userId);
      if (userId) {
        login();
        console.log("logged-in");
        navigate("/home");
      }
      console.log("User ID:", userId);
    } else {
      console.log("Token not found in localStorage");
    }
  }, []);

  const handleSignIn = async (userData: any) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/user/signin", {
        username: userData.username,
        password: userData.password,
      });

      if (response.status === 201) {
        toast.success("Successfully signed In");
        //storing token.............
        localStorage.setItem("Token :", response.data.token);
        login();
        setUser(response.data.userId);
        //redirecting........
        setTimeout(() => {
          navigate("/home");
        }, 500);
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        console.log("Invalid username or password");
      }
      toast.error("Wrong Username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData: any) => {
    try {
      await axios.post("http://localhost:5000/user/register", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      console.log("sucess_send");
      toast.success("User Succesfully Registered");
      navigate("/signin");
    } catch (error: any) {
      if (error.response.status === 400) {
        console.log("User Already exists");
        toast.error("User Already exists");
      }
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing_page />} />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        {!isAuthenticated && (
          <Route
            path="/signin"
            element={
              loading ? (
                <div className="loading"> Loading...</div>
              ) : (
                <SignIn onSignIn={handleSignIn} />
              )
            }
          />
        )}
        {/* private route */}
        {isAuthenticated && (
          <Route path="/home" element={<RouteLayout />}>
            <Route index element={<Home blogs={[]} />} />
            <Route path="/home/profile/:id" element={<ViewProfile />} />
            <Route path="/home/explore" element={<Explore />} />
            <Route path="/home/all-users" element={<People />} />
            <Route path="home/notification" element={<Notification />} />
            <Route path="/home/saved" element={<SavedPost />} />
            <Route path="/home/create-post" element={<CreatePost />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
