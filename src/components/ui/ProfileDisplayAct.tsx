import React from "react";
import SavedPost from "../../pages/SavedPost";
import DisplayUserPost from "../../pages/DisplayUserPost";

interface ProfileDisplayActProps {
  page: string;
}

const ProfileDisplayAct: React.FC<ProfileDisplayActProps> = ({ page }) => {
  return (
    <div>
      {page === "post" ? (
        <DisplayUserPost />
      ) : page === "like" ? (
        "nothing"
      ) : (
        <SavedPost />
      )}
    </div>
  );
};

export default ProfileDisplayAct;
