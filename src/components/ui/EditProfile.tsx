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
  onreload: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  user,
  openDialog,
  onreload,
}) => {
  const [dialog, setDialog] = useState(false);
  const [cropImage, setCropImage] = useState("");
  const [storeImage, setStoreImage] = useState(user.avatar);
  const [backImage, setBackImage] = useState(user.backImage);
  const [fullName, setFullName] = useState("");
  const [bios, setBios] = useState("");

  const handleonCrop = (view: any) => {
    setCropImage(view);
  };
  const handleonClose = () => {
    setCropImage("");
  };
  const handleClick = (imageType: "avatar" | "backImage") => {
    setDialog(false);
    if (imageType === "avatar") {
      setStoreImage(cropImage);
    } else {
      setBackImage(cropImage);
    }
  };

  const saveImage = async () => {
    // api request
    try {
      const blob = await fetch(storeImage).then((r) => r.blob());

      // Create a File object from the Blob
      const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });

      // Send the File object to the server
      const avatar = await postImage(file);
      console.log(avatar);
      const res = await axios.patch(
        `https://socialbinge-server-gagan-prakash.onrender.com/user/update/${user._id}`,
        {
          avatar: avatar,
          fullName: fullName,
          bio: bios,
        }
      );
      console.log(res);
      if (res.status == 200) {
        toast.success("Successfully Updated");
        onreload();
        openDialog();
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

          <div className="background_img" onClick={() => setDialog(true)}>
            <img
              className="back-img"
              src={`${backImage ? backImage : ""}`}
              alt=""
            />
            <div className="avatarImg">
              <div className="onHover" onClick={() => setDialog(true)}>
                <FaCamera size={"2rem"} />
              </div>

              <img src={storeImage ? storeImage : avatr2} alt="avatar" />
            </div>
          </div>
        </div>
        <label htmlFor="">FullName</label>
        <input
          type="text"
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <label htmlFor="">Bios :</label>
        <input
          type="text"
          onChange={(e) => {
            setBios(e.target.value);
          }}
        />

        <Dialog
          header="Upload Image"
          visible={dialog}
          className="upload-box"
          onHide={() => setDialog(false)}
        >
          <div className="oter-div">
            <Avatar
              height={250}
              width={350}
              onClose={handleonClose}
              onCrop={handleonCrop}
            />
            {/* profile pic buttons ----------------------------- */}
            <div>
              <button
                onClick={() => handleClick("avatar")} // Update avatar
              >
                Update Avatar
              </button>

              <button
                onClick={() => {
                  setDialog(false);
                }}
              >
                Back
              </button>
            </div>
          </div>
        </Dialog>

        <button className="upload-btn" onClick={saveImage}>
          Upload
        </button>
        {/* -------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default EditProfile;
