import React from "react";
import avatarr from "../../assets/account_avatr.png";
import { formatDate } from "../../constants/PostImg";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";

interface Notification {
  _id: string;
  type: string;
  postId: string;
  senderdetail: any;
  timestamp: string;
}

interface NotifyTabProps {
  notification: Notification;
}

const NotifyTab: React.FC<NotifyTabProps> = ({ notification }) => {
  const date = new Date(notification.timestamp);

  return (
    <div className="notifyTab">
      <span className="notifyTab">
        <span style={{ fontSize: "1.3rem", paddingRight: "2px" }}>
          {notification.type === "like" ? (
            <FaHeart color="red" />
          ) : notification.type === "follow" ? (
            <RiUserFollowFill color="aqua" />
          ) : (
            <FaBookmark color="rgb(0, 128, 255)" />
          )}
        </span>
        <img
          src={
            notification.senderdetail.avatar
              ? notification.senderdetail.avatar
              : avatarr
          }
          alt=""
          style={{
            height: "30px",
            width: "30px",
            objectFit: "contain",
            borderRadius: "50%",
          }}
        />
        <span className="username1">{notification.senderdetail.username}</span>
        <span>
          {notification.type === "like" ? (
            <span>
              <span style={{ color: "red" }}> liked</span> your blog
            </span>
          ) : notification.type === "bookMark" ? (
            <span>
              <span style={{ color: "rgb(0, 128, 255)" }}>bookmarked</span> your
              blog
            </span>
          ) : (
            <span>
              {" "}
              is now <span style={{ color: "aqua" }}>following</span> you{" "}
            </span>
          )}
        </span>
      </span>
      <span className="date-cr">{formatDate(date)}</span>
    </div>
  );
};

export default NotifyTab;
