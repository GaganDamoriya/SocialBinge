import React from "react";
import "./viewprofile.css";

const ViewProfile = () => {
  return (
    <div className="profile_page">
      <div className="head">
        <span>Gagan_Prakash</span>
        <span style={{ color: "grey", fontStyle: "italic" }}>no.posts</span>
      </div>

      <div className="background_img">
        <div className="avatarImg"></div>
      </div>
      <div className="edit-profile">
        <span>Edit Profile</span>
      </div>
      <div className="personal_details">
        <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>GP</span>
        <span className="styling-2" style={{ fontStyle: "italic" }}>
          email123@m.com
        </span>
      </div>
      <div className="creation-date styling-2">Created At</div>
      <div className="follower-details">
        <span>
          <span className="styling">0</span>
          <span className="styling-2">Followers</span>
        </span>
        <span>
          <span className="styling">0</span>
          <span className="styling-2">Followers</span>
        </span>
      </div>

      <div className="profile_page_navbar">
        <span>Posts</span>
        <span>Liked</span>
        <span>Saved</span>
      </div>
    </div>
  );
};

export default ViewProfile;
