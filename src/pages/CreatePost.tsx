import React, { useState, useEffect } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import "./page.css";
import { postImage, parseTags } from "../constants/PostImg";
import axios from "axios";
import { useUser } from "../components/UserContext";
import Loader from "../components/ui/Loader";
type FormValue = {
  caption: string;
  location: string;
  Hashtag: string;
};

const CreatePost = () => {
  const [img, setImg] = useState<File | null>(null);
  const [postortag, setPostOrTag] = useState("Post");
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useUser();

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

    setIsLoading(true);
    //FUNCTION FOR STORING IMAGE IN FIREBASE RETURN ITS LINK
    const imgURL = await postImage(img);
    console.log(imgURL);
    const date = new Date();
    //request axios

    try {
      await axios.post("http://localhost:5000/blog/addBlog", {
        caption: data.caption,
        imageUrl: imgURL,
        user: userId,
        location: data.location,
        Hashtag: parseTags(data.Hashtag),
        createdAt: date,
      });
      console.log("sucess_send");
      toast.success("Post sent successfully");
    } catch (e) {
      console.log("error", e);
    }
    setIsLoading(false);
  };

  //form-------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="Create-div">
      {isLoading ? (
        <div
          style={{
            height: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="Create-post">
          <div className="switch">
            <button
              className={`post-btn ${postortag === "Post" ? "isActive" : ""}`}
              onClick={() => setPostOrTag("Post")}
            >
              Post
            </button>
            <button
              className={`tag-btn ${postortag === "Tag" ? "isActive" : ""}`}
              onClick={() => setPostOrTag("Tag")}
            >
              Tag
            </button>
          </div>
          <div className="heading">
            <span className="create-icon">
              <BiSolidImageAdd />
            </span>
            <h1>{postortag === "Post" ? "Create Post" : "Create Tag"}</h1>
          </div>

          {postortag === "Post" ? (
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
          ) : (
            <div>TAGGGGGGGGGGGGGGGGgg</div>
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default CreatePost;
