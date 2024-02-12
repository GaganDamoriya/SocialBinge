import React from "react";
import SavedPost from "../../pages/SavedPost";
import DisplayUserPost from "../../pages/DisplayUserPost";
import LikedPostDisplay from "../../pages/LikedPostDisplay";

interface ProfileDisplayActProps {
  page: string;
  id: string | null;
}

const ProfileDisplayAct: React.FC<ProfileDisplayActProps> = ({ page, id }) => {
  return (
    <div>
      {page === "post" ? (
        <DisplayUserPost id={id} />
      ) : page === "like" ? (
        <LikedPostDisplay id={id} />
      ) : (
        <SavedPost />
      )}
    </div>
  );
};

export default ProfileDisplayAct;
