import React from "react";
import "./style.css";
import { CiLogout } from "react-icons/ci";
import avatr from "../../assets/acc-image2.webp";
import { IoIosChatbubbles } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="topbar-div">
      <span className="Logo">
        <IoIosChatbubbles className="chatlogo" />
        <span>Social</span>
        <span style={{ color: "rgb(197, 72, 72)" }}>Binge</span>
      </span>
      <div className="right-icons">
        <span className="Logout-btn">
          <CiLogout />
        </span>
        <span>
          <img className="avatar_img" src={avatr} alt="avatar" />
        </span>
      </div>
    </div>
  );
};

export default Topbar;
