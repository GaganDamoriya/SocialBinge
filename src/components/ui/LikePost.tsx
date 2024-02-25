import React, { useState } from "react";
import "./style.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

interface likePostProps {
  id: string;
  userId: string | null;
  senderId: string | null;
}

const LikePost: React.FC<likePostProps> = ({ id, userId, senderId }) => {
  const [liked, setLiked] = useState(false); //initial state like (blogdata.like)

  const likePost = async (id: string, userId: null | string) => {
    try {
      if (!userId) {
        // Handle the case where userId is not available
        console.error("User ID not available.");
        return;
      }

      await axios.post(`http://localhost:5000/user/like/${userId}`, {
        BlogId: id,
        userId: userId,
        senderId: senderId,
      });
    } catch (error) {
      // Handle errors
      console.error("Error bookmarking post:", error);
    }
  };

  const handleClick = () => {
    setLiked(!liked);
    likePost(id, userId);
  };

  return (
    <div className="liked-post" onClick={handleClick}>
      {liked ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
    </div>
  );
};

export default LikePost;
