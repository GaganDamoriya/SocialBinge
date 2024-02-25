import React from "react";
import avatarr from "../../assets/account_avatr.png";

interface Notification {
  _id: string;
  type: string;
  postId: string;
  senderdetail: any;
}

interface NotifyTabProps {
  notification: Notification;
}

const NotifyTab: React.FC<NotifyTabProps> = ({ notification }) => {
  return (
    <div className="notifyTab">
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
      {notification.type === "like"
        ? "    liked your blog "
        : notification.type === "bookMark"
        ? "   bookmarked your blog"
        : "   is now following you "}
    </div>
  );
};

export default NotifyTab;
