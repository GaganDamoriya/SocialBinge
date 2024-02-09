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
  __v: number;
}

const ViewProfile = () => {
  const [dialog, setDialog] = useState(false);
  const [userActivity, setUserActivity] = useState("post");
  const { userId } = useUser();
  const [storeUser, setStoreUser] = useState<UserProfile>();
  const [cropImage, setCropImage] = useState("");
  const [reload, setRelod] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${userId}`
        );
        setStoreUser(response.data.user);
        console.log("storeUser", storeUser);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [reload]);

  const handleonCrop = (view: any) => {
    setCropImage(view);
  };
  const handleonClose = () => {
    setCropImage("");
  };

  const saveImage = async () => {
    // api request
    try {
      const blob = await fetch(cropImage).then((r) => r.blob());

      // Create a File object from the Blob
      const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });

      // Send the File object to the server
      const avatar = await postImage(file);
      console.log(avatar);
      const res = await axios.patch(
        `http://localhost:5000/user/update/${userId}`,
        {
          avatar: avatar,
        }
      );
      console.log(res);
      if (res.status == 200) {
        toast.success("Successfully Updated");
        setRelod(!reload);
      }
    } catch (e) {
      console.log(e);
    }

    setDialog(false);
  };
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
          <div className="background_img" onClick={() => setDialog(true)}>
            <img className="back-img" src="" alt="" />
            <div className="avatarImg" onClick={() => setDialog(true)}>
              <div className="onHover">
                <FaCamera size={"2rem"} />
              </div>
              <img
                src={storeUser.avatar ? storeUser.avatar : avatr2}
                alt="avatar"
              />
            </div>
          </div>
          <Dialog
            header="UPLOAD IMAGE"
            visible={dialog}
            className="dialog-box"
            onHide={() => setDialog(false)}
          >
            <div className="dialog-div1">
              <div className="dialog-inner">
                <div className="web-view">
                  <Avatar
                    width={400}
                    height={230}
                    onCrop={handleonCrop}
                    onClose={handleonClose}
                  />
                </div>
                <div className="mobile-view">
                  <Avatar
                    width={290}
                    height={200}
                    onCrop={handleonCrop}
                    onClose={handleonClose}
                  />
                </div>
              </div>
              <button className="upload-btn" onClick={saveImage}>
                Upload
              </button>
            </div>
          </Dialog>
          <div className="edit-profile">
            <span>Edit Profile</span>
          </div>
          <div className="personal_details">
            <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              {storeUser.username}
            </span>
            <span className="styling-2" style={{ fontStyle: "italic" }}>
              {storeUser.email}
            </span>
          </div>

          <div className="creation-date styling-2">Created At</div>
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
        <ProfileDisplayAct page={userActivity} />
      </div>
    </div>
  );
};

export default ViewProfile;
