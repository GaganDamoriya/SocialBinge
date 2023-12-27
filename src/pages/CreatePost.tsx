import React, { useState, useEffect } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import "./page.css";
import { postImage, parseTags } from "../constants/PostImg";
import axios from "axios";
type FormValue = {
  caption: string;
  location: string;
  Hashtag: string;
};

const CreatePost = () => {
  const [img, setImg] = useState<File | null>(null);
  const [id, setId] = useState("");
  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    try {
      if (token) {
        // Decode the token
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = atob(payloadBase64);

        // Parse the JSON-encoded payload
        const decodedObject = JSON.parse(decodedPayload);

        // Access user information
        setId(decodedObject.userId);
      } else {
        console.warn("Token not found in local storage");
      }
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  }, [id]); // Include dependencies if needed

  const Blogschema = z.object({
    caption: z.string().min(5).max(60),
    location: z.string().min(0),
    Hashtag: z.string().min(0),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ resolver: zodResolver(Blogschema) });

  const handlepost = async (data: FormValue) => {
    console.log(data);

    //FUNCTION FOR STORING IMAGE IN FIREBASE RETURN ITS LINK
    const imgURL = await postImage(img);
    console.log(imgURL);
    const date = new Date();
    //request axios

    try {
      await axios.post("http://localhost:5000/blog/addBlog", {
        caption: data.caption,
        imageUrl: imgURL,
        user: id,
        location: data.location,
        Hashtag: parseTags(data.Hashtag),
        createdAt: date,
      });
      console.log("sucess_send");
      toast.success("Post sent successfully");
    } catch (e) {
      console.log("error", e);
    }
  };

  //form-------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="Create-post">
      <div className="heading">
        <span className="create-icon">
          <BiSolidImageAdd />
        </span>
        <h1>Create Post</h1>
      </div>

      <form
        className="formdiv"
        onSubmit={handleSubmit((data) => handlepost(data))}
      >
        <div className="Create-post-form">
          <label>Caption</label>
          <textarea
            id="Description"
            placeholder="your caption here !"
            {...register("caption")}
          />
          <label>Add photos and vedios</label>
          <input
            type="file"
            onChange={(e) => {
              setImg(e.target.files ? e.target.files[0] : null);
            }}
          />
          <label>Location </label>
          <input
            type="text"
            placeholder="eg: india"
            {...register("location")}
          />

          <label>Tags(#)</label>
          <input
            type="text"
            placeholder="eg: #newtoBinge"
            {...register("Hashtag")}
          />

          <input
            type="submit"
            style={{ color: "white", background: "green" }}
          />
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default CreatePost;
