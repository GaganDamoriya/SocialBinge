import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
interface FollowBtnProps {
  followId: string | "";
  userId: string | null;
  userfollowing?: string[];
  onfollow: () => void;
}

const FollowBtn: React.FC<FollowBtnProps> = ({
  followId,
  userId,
  userfollowing,
  onfollow,
}) => {
  const handleFollow = async () => {
    try {
      if (!userId) {
        // Handle the case where userId is not available
        console.error("User ID not available.");
        return;
      }

      const res = await axios.post(
        `http://localhost:5000/user/follow/${userId}`,
        {
          userId: userId,
          followId: followId,
        }
      );
      if (res.status === 200) toast.success(`Now following user`);
      onfollow();
    } catch (error) {
      // Handle errors
      console.error("Error bookmarking post:", error);
    }
  };

  return (
    <div>
      {userfollowing && userfollowing.includes(followId) ? (
        <span
          className="styling-2"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          following..
        </span>
      ) : (
        <button className="follow-btn" onClick={handleFollow}>
          Follow
        </button>
      )}
      <Toaster />
    </div>
  );
};

export default FollowBtn;
