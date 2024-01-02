import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import accAvrt from "../../assets/account_avatr.png";

interface User {
  avatar: string;
  bookmarks: string[];
  email: string;
  follower: string[];
  following: string[];
  password: string;
  username: string;
  __v: number;
  _id: string;
}

interface RightBarDetail {
  userD: User[];
}
const RightBar = () => {
  const [allUser, setAllUser] = useState<RightBarDetail>({ userD: [] });
  useEffect(() => {
    const fetchallUser = async () => {
      try {
        await axios.get("http://localhost:5000/user/").then((res) => {
          setAllUser({ userD: res.data.allUsers.slice(0, 4) });
        });
      } catch (err) {
        console.log("error : ", err);
      }
    };
    fetchallUser();
  }, []);

  return (
    <div className="RightBar_div">
      <h2>People</h2>
      <div className="User-container">
        {allUser.userD && allUser.userD.length > 0 ? (
          allUser.userD.map((user) => (
            <div className="user-card" key={user._id}>
              <div className="user-img">
                <img
                  className="img_avatar"
                  src={user.avatar ? user.avatar : accAvrt}
                  alt="avatar"
                />
              </div>
              <span>{user.username}</span>
              <button>Follow</button>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <span className="more-btn">more.</span>
    </div>
  );
};

export default RightBar;
