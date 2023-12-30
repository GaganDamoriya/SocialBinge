import React, { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";

interface bookmarkProps {
  id: string;
  userBookMark: string[];
  userId: string | null;
}

const BookMarkBtn: React.FC<bookmarkProps> = ({ id, userId, userBookMark }) => {
  const [bookMark, setBookMark] = useState(false); //intial state bookmark (blogdata.bookmark)

  useEffect(() => {
    const isChecked = userBookMark.includes(id);
    if (isChecked) {
      setBookMark(true);
    }
  }, []);

  //post request to server to add Bookmark to the blog
  const bookMarkPost = async (id: string, userId: null | string) => {
    try {
      if (!userId) {
        // Handle the case where userId is not available
        console.error("User ID not available.");
        return;
      }

      await axios.post(`http://localhost:5000/user/save/${userId}`, {
        BlogId: id,
        userId: userId,
      });
    } catch (error) {
      // Handle errors
      console.error("Error bookmarking post:", error);
    }
  };

  const handleBookMark = () => {
    setBookMark(!bookMark);
    bookMarkPost(id, userId);
  };

  return (
    <div className="bookMark" onClick={handleBookMark}>
      {bookMark ? <FaBookmark style={{ color: "white" }} /> : <FaRegBookmark />}
    </div>
  );
};

export default BookMarkBtn;
