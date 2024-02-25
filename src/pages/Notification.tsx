import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../components/UserContext";
import { fetchNotification, getUser } from "../constants/PostImg";
import NotifyTab from "../components/ui/NotifyTab";

interface Notification {
  _id: string;
  type: string;
  postId: string;
  senderdetail: any;
}
interface notiArray {
  notification: Notification[];
}

const Notification = () => {
  const { userId } = useUser();
  const [notification, setNotification] = useState<notiArray>({
    notification: [],
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(userId);
      console.log(user.notifications);
      const res = await fetchNotification(user.notifications);
      setNotification(res);
      console.log(res);
      console.log("not-->", notification);
    };

    fetchUser();
  }, []);

  return (
    <div className="notification-page">
      <h2>Notification</h2>
      <div>
        {notification.notification.length > 0 &&
          notification.notification.map((notify) => (
            <NotifyTab notification={notify} />
          ))}
      </div>
    </div>
  );
};

export default Notification;
