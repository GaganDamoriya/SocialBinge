import React from "react";
import "./style.css";
import { CiLogout } from "react-icons/ci";
import { Link, NavLink, useLocation } from "react-router-dom";
import avatr from "../../assets/acc-image2.webp";
import { sidebarLinks } from "../../constants/Constant";
const LeftBar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="LeftSide-bar">
      <div>
        <div className="Logo">SocialBinge</div>
        <Link to={"/home/profile"}>
          <div className="nav-profile">
            <span>
              <img className="avatar_img" src={avatr} alt="avatar" />
            </span>
            <span className="nav-bios">
              <span className="name"> Gagan Prakash</span>
              <span className="username">@gaganss</span>
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
        <div className="logout-sidebar">
          <span>Logout</span>
          <CiLogout style={{ fontSize: "25px" }} />
        </div>
      </Link>
    </nav>
  );
};

export default LeftBar;
