import axios from "axios";
import { useEffect, useId, useState } from "react";
import { getUser, truncateString } from "../constants/PostImg";
import accountImg from "../assets/account_avatr.png";
import { useNavigate } from "react-router-dom";
import FollowBtn from "../components/ui/FollowBtn";
import { useUser } from "../components/UserContext";
interface User {
  _id: string;
  username: string;
  email: string;
  blogs: string[];
  bookMarks: string[];
  avatar: string; // Assuming avatar is a string, adjust accordingly
  follower: string[]; // Assuming follower is an array of string, adjust accordingly
  following: string[]; // Assuming following is an array of string, adjust accordingly
  like: string[]; // Assuming like is an array of string, adjust accordingly
  backImage: String;
  createdAt: Date;
  fullName: String;
  bio: String;
  __v: number;
}

interface PeopleProps {
  userD: User[];
}

const People = () => {
  const [allUser, setAllUser] = useState<PeopleProps>({ userD: [] });
  const [currUser, setCurrUser] = useState<User>();
  const navigate = useNavigate();
  const { userId } = useUser();

  useEffect(() => {
    const fetchallUser = async () => {
      try {
        await axios
          .get("https://socialbinge-server-gagan-prakash.onrender.com/user/")
          .then((res) => {
            console.log(res);
            setAllUser({ userD: res.data.allUsers });
          });
        const user = await getUser(userId);
        setCurrUser(user);
      } catch (err) {
        console.log("error : ", err);
      }
    };
    fetchallUser();
  }, []);

  return (
    <div className="people-page">
      <h2>{`hi, ${currUser?.username} Connect with People !🤝`}</h2>
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
              <div
                className="people-tab"
                onClick={() => navigate(`/home/profile/${user._id}`)}
                key={i}
              >
                <div className="user-detail">
                  <img
                    className="img_avatar"
                    src={user.avatar === "" ? accountImg : user.avatar}
                    alt="userimg"
                  />

                  <div className="user-content">
                    <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>
                      {userId === user._id ? (
                        <span style={{ color: "red" }}>
                          {user.username}(You)
                        </span>
                      ) : (
                        user.username
                      )}
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

                <FollowBtn
                  followId={user._id}
                  userId={userId}
                  userfollowing={currUser?.following}
                  onfollow={() => {}}
                />
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
