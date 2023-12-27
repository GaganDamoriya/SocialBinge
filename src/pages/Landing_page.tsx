import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Landing_page = () => {
  const navigate = useNavigate();
  return (
    <div className="landing_page">
      <span className="landing_title">SocialBinge</span>
      <button className="landing_btn" onClick={() => navigate(`/signin`)}>
        Lets Binge!!
      </button>
    </div>
  );
};

export default Landing_page;
