import React, { useState } from "react";
import "./style.css";
import avatar from "../../assets/account_avatr.png";
import { formatDate } from "../../constants/PostImg";
import BookMarkBtn from "../ui/BookMark";
import LikePost from "../ui/LikePost";
interface Blog {
  _id: string;
  caption: string;
  imageUrl: string;
  location: string;
  Hashtag: string[];
  createdAt: Date;
  user: any;
  // Add other properties as needed
}

interface CarouselProps {
  blogDta: Blog; // Adjust the type to match your actual type
  savedUserBlog: string[];
  userID: string | null;
  visibilty: (id: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  blogDta,
  savedUserBlog,
  userID,
  visibilty,
}) => {
  const [liked, setLiked] = useState(false); //initial state like (blogdata.like)

  return (
    <div className="carouselCard" key={blogDta._id}>
      <div className="avatar_div">
        <img
          className="img_avatar"
          src={blogDta.user.avatar ? blogDta.imageUrl : avatar}
          alt="avatar"
        />
      </div>
      <div className="post-details">
        <div className="user-info">
          <span>{blogDta.user.username}</span>
          <span className="date">
            {formatDate(new Date(blogDta.createdAt))}
          </span>
        </div>
        <div className="post-info">
          <p>{blogDta.caption}</p>
          <span>
            {blogDta.Hashtag.map((i) => {
              return (
                <span className="tags" key={i}>
                  {i}
                </span>
              );
            })}
          </span>
          <img className="img-post" src={blogDta.imageUrl} alt="imgurl" />
        </div>
        <div className="logos_bottom">
          <div>
            {/* {liked ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />} */}
            <LikePost id={blogDta._id} userId={userID} />
          </div>
          <div
            className="bookMark"
            onClick={() => {
              visibilty(blogDta._id);
            }}
          >
            <BookMarkBtn
              id={blogDta._id}
              userBookMark={savedUserBlog}
              userId={userID}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
