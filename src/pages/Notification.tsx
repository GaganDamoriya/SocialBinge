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
  timestamp: string;
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
      const res = await fetchNotification(user.notifications);
      res.notification.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setNotification(res);
    };

    fetchUser();
  }, []);

  return (
    <div className="notification-page">
      <h2>Notification</h2>
      <div className="notifi-div">
        {notification.notification.length > 0 &&
          notification.notification.map((notify, key) => (
            <div key={key}>
              <NotifyTab notification={notify} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notification;
