import React, { useState, useEffect } from "react";
import "./style.css";
import { CiLogout } from "react-icons/ci";
import { Link, NavLink, useLocation } from "react-router-dom";
import avatr from "../../assets/acc-image2.webp";
import { sidebarLinks } from "../../constants/Constant";
import { getUser } from "../../constants/PostImg";
import { useUser } from "../UserContext";
import { useAuth } from "../AuthContext";

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

const LeftBar = () => {
  const [storeUser, setStoreUser] = useState<UserProfile>();
  const { pathname } = useLocation();
  const { userId } = useUser();
  const { logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("Token :");
    logout();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(userId);
      setStoreUser(user);
    };
    fetchUser();
  }, []);

  return (
    <nav className="LeftSide-bar">
      <div>
        <div className="Logo">SocialBinge</div>
        <Link to={`/home/profile/${userId}`}>
          <div className="nav-profile">
            <img
              className="avatar_img"
              src={storeUser?.avatar ? storeUser.avatar : avatr}
              alt="avatar"
            />
            <span className="nav-bios">
              <span className="name">
                {" "}
                {storeUser?.fullName
                  ? storeUser?.fullName
                  : storeUser?.username}
              </span>
              <span className="username">{storeUser?.email}</span>
            </span>
          </div>
        </Link>
        <ul className="Navlinks">
          {sidebarLinks.map((nav, i) => {
            const isActive = pathname === nav.route;
            return (
              <li key={i}>
                <NavLink
                  className={`Navigaton-li ${isActive && "activeClass"} `}
                  to={nav.route}
                >
                  <span
                    style={{
                      fontSize: "21px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {nav.icon}
                  </span>
                  <span>{nav.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Link to={"/signin"}>
        <div className="logout-sidebar" onClick={handleLogout}>
          <span>Logout</span>
          <CiLogout style={{ fontSize: "25px" }} />
        </div>
      </Link>
    </nav>
  );
};

export default LeftBar;
