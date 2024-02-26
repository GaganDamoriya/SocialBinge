import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import accAvrt from "../../assets/account_avatr.png";
import FollowBtn from "../ui/FollowBtn";
import { useUser } from "../UserContext";
import { getUser } from "../../constants/PostImg";

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
  const [currUser, setCurrUser] = useState<User>();
  const [relod, setRelod] = useState(false);
  const { userId } = useUser();
  useEffect(() => {
    const fetchallUser = async () => {
      try {
        await axios
          .get("https://socialbinge-server-gagan-prakash.onrender.com/user/")
          .then((res) => {
            setAllUser({ userD: res.data.allUsers.slice(0, 4) });
          });
      } catch (err) {
        console.log("error : ", err);
      }
    };
    const currUser = async () => {
      const user = await getUser(userId);
      setCurrUser(user);
      console.log(user);
    };
    fetchallUser();
    currUser();
  }, [relod]);

  const handleRelod = () => {
    setRelod(!relod);
  };

  return (
    <div className="RightBar_div">
      <h2>People</h2>
      <div className="User-container">
        {allUser.userD && allUser.userD.length > 0 ? (
          allUser.userD.map((user) => (
            <div className="user-card" key={user._id}>
              <Link to={`/home/profile/${user._id}`}>
                <div className="user-img">
                  <img
                    className="img_avatar"
                    src={user.avatar ? user.avatar : accAvrt}
                    alt="avatar"
                  />
                </div>
              </Link>
              <span>{user.username}</span>
              <FollowBtn
                followId={user._id}
                userId={userId}
                userfollowing={currUser?.following}
                onfollow={handleRelod}
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Link to={"/home/all-users"}>
        <span className="more-btn">Show more</span>
      </Link>
    </div>
  );
};

export default RightBar;
