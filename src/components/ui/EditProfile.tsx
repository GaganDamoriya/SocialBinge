import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { postImage } from "../../constants/PostImg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import avatr2 from "../../assets/user.png";
import { FaCamera } from "react-icons/fa";
import Avatar from "react-avatar-edit";

interface user {
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
interface EditProfileProps {
  user: user;
  openDialog: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, openDialog }) => {
  const [dialog, setDialog] = useState(false);
  const [cropImage, setCropImage] = useState("");
  const [reload, setRelod] = useState(false);

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
        `http://localhost:5000/user/update/${user._id}`,
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
    <div>
      <div className="dialog-div1">
        <div className="dialog-inner">
          {/* ------------------------------UPDATE HERE -------------------------------------------------- */}

          <div className="background_img">
            <img className="back-img" src="" alt="" />
            <div className="avatarImg">
              <div className="onHover">
                <FaCamera size={"2rem"} />
              </div>
              <img src={user.avatar ? user.avatar : avatr2} alt="avatar" />
            </div>
          </div>
        </div>
        <label htmlFor="">FullName</label>
        <input type="text" />
        <label htmlFor="">Bios :</label>
        <input type="text" />

        <button className="upload-btn" onClick={saveImage}>
          Upload
        </button>
        {/* -------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default EditProfile;
