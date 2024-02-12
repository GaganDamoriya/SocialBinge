import React, { useState, useEffect } from "react";
import "./viewprofile.css";
import { naviBar } from "../../constants/Constant";
import ProfileDisplayAct from "../../components/ui/ProfileDisplayAct";
import axios from "axios";
import { useUser } from "../../components/UserContext";
import avatr2 from "../../assets/user.png";
import Avatar from "react-avatar-edit";
import { FaCamera } from "react-icons/fa";
import { Dialog } from "primereact/dialog";
import { getUser, postImage } from "../../constants/PostImg";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import EditProfile from "../../components/ui/EditProfile";

interface UserProfile {
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

const ViewProfile = () => {
  const [userActivity, setUserActivity] = useState("post");
  const { userId } = useUser();
  const { id } = useParams();
  const [storeUser, setStoreUser] = useState<UserProfile>();
  const [dialog, setDialog] = useState(false);
  const [reload, setRelod] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setStoreUser(response.data.user);
        console.log("storeUser", storeUser);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [reload]);

  function formatDate(dateString: Date) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return `Joined ${formattedDate}`;
  }

  return (
    <div className="profile_page">
      <Toaster />
      {storeUser && (
        <div>
          <div className="head">
            <span>{storeUser.username}</span>
            <span style={{ color: "grey", fontStyle: "italic" }}>
              {storeUser.blogs.length} posts
            </span>
          </div>
          <div className="background_img">
            <img className="back-img" src="" alt="" />
            <div className="avatarImg">
              <div className="onHover">
                <FaCamera size={"2rem"} />
              </div>
              <img
                src={storeUser.avatar ? storeUser.avatar : avatr2}
                alt="avatar"
              />
            </div>
          </div>

          <div className="edit-profile">
            {id === userId ? (
              <span onClick={() => setDialog(true)}>Edit Profile</span>
            ) : (
              ""
            )}
            <Dialog
              header="Edit Profile"
              visible={dialog}
              className="dialog-box"
              onHide={() => setDialog(false)}
            >
              {storeUser && (
                <EditProfile
                  user={storeUser}
                  openDialog={() => setDialog(true)}
                />
              )}
            </Dialog>
          </div>
          <div className="personal_details">
            <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              {storeUser.username}
            </span>
            <span className="styling-2" style={{ fontStyle: "italic" }}>
              {storeUser.email}
            </span>
          </div>

          <div className="creation-date styling-2">
            {formatDate(storeUser.createdAt)}
          </div>
          <div className="follower-details">
            <span>
              <span className="styling">{storeUser.follower.length}</span>
              <span className="styling-2">Follower</span>
            </span>
            <span>
              <span className="styling">{storeUser.following.length}</span>
              <span className="styling-2">Following</span>
            </span>
          </div>
        </div>
      )}

      {/* navbars to display post , liked , saved blogposts ........................................................*/}
      <div className="profile_page_navbar">
        {naviBar.map((e, i) => {
          return (
            <span
              key={i}
              className={`styling-2 ${
                userActivity === e.value ? "styling-active" : ""
              }`}
              onClick={() => setUserActivity(e.value)}
            >
              {e.name}
            </span>
          );
        })}
      </div>
      <div>
        <ProfileDisplayAct page={userActivity} id={id || ""} />
      </div>
    </div>
  );
};

export default ViewProfile;
