import axios from "axios";
import { useEffect, useState } from "react";
import { truncateString } from "../constants/PostImg";
import accountImg from "../assets/account_avatr.png";
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

interface PeopleProps {
  userD: User[];
}

const People = () => {
  const [allUser, setAllUser] = useState<PeopleProps>({ userD: [] });

  useEffect(() => {
    const fetchallUser = async () => {
      try {
        await axios.get("http://localhost:5000/user/").then((res) => {
          console.log(res);
          setAllUser({ userD: res.data.allUsers });
        });
      } catch (err) {
        console.log("error : ", err);
      }
    };
    fetchallUser();
  }, []);

  return (
    <div className="people-page">
      <h2>Connect with People !🤝</h2>
      <p
        style={{
          color: "grey",
          fontSize: "medium",
          fontStyle: "italic",
        }}
      >
        Share your authentic self and show interest in others to foster genuine
        connections.
      </p>

      <div>
        {allUser.userD && allUser.userD.length > 0 ? (
          allUser.userD.map((user, i) => {
            return (
              <div className="people-tab" key={i}>
                <div className="user-detail">
                  <img
                    className="img_avatar"
                    src={user.avatar === "" ? accountImg : user.avatar}
                    alt="userimg"
                  />

                  <div className="user-content">
                    <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>
                      {user.username}
                    </span>
                    <span
                      style={{
                        color: "grey",
                        fontSize: "small",
                        fontStyle: "italic",
                      }}
                    >
                      {truncateString(user.email)}
                    </span>
                  </div>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            );
          })
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default People;
