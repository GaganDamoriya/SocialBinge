import React, { useState, useEffect } from "react";
import "./style.css";
import { CiLogout } from "react-icons/ci";
import avatr from "../../assets/acc-image2.webp";
import { IoIosChatbubbles } from "react-icons/io";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../constants/PostImg";
import { useUser } from "../UserContext";
interface UserProfile {
  _id: string;
  username: string;
  email: string;
  blogs: string[];
  bookMarks: string[];
  avatar: string; // Assuming avatar is a string, adjust accordingly
  follower: string[]; // Assuming follower is an array of string, adjust accordingly
  following: string[]; // Assuming following is an array of string, adjust accordingly
  like: string[]; // Assuming like is an array of string, adjust accordingly
  backImage: String;
  createdAt: Date;
  fullName: String;
  bio: String;
  __v: number;
}

const Topbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { userId } = useUser();

  const [storeUser, setStoreUser] = useState<UserProfile>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(userId);
      setStoreUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("Token :");
    navigate("/signin");
  };

  return (
    <div className="topbar-div">
      <span className="Logo">
        <IoIosChatbubbles className="chatlogo" />
        <span>Social</span>
        <span style={{ color: "rgb(197, 72, 72)" }}>Binge</span>
      </span>
      <div className="right-icons">
        <span className="Logout-btn" onClick={handleLogout}>
          <CiLogout />
        </span>
        <span onClick={() => navigate(`/home/profile/${userId}`)}>
          <img
            className="avatar_img"
            src={storeUser?.avatar ? storeUser.avatar : avatr}
            alt="avatar"
          />
        </span>
      </div>
    </div>
  );
};

export default Topbar;
