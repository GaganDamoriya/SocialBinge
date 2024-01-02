import React, { useState, useEffect } from "react";
import "./page.css";
import { useUser } from "../components/UserContext";
import { fetchBlog, userBookmarkArray } from "../constants/PostImg";
import Carousel from "../components/carousel/Carousel";

interface Blog {
  _id: string;
  caption: string;
  imageUrl: string;
  location: string;
  Hashtag: string[];
  createdAt: Date;
  user: any;
  // Add other properties as needed
}
interface BlogData {
  blogs: Blog[];
}

const SavedPost: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogData>({ blogs: [] });
  const [storeBookmarks, setStoreBookmarks] = useState<string[]>([]);
  const { userId } = useUser();
  // const userId = "6590ff02b144b46b83e691f1";

  useEffect(() => {
    userBookmarkArray(userId)
      .then((response: string[]) => {
        console.log(response);
        setStoreBookmarks(response);

        // The console.log here may not show the updated value immediately
        // due to the asynchronous nature of state updates
        console.log("Bookmarks : ", response);

        fetchBlog(response).then((vBlog: BlogData) => {
          console.log(vBlog);
          setBlogData(vBlog);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const removeBookMark = (id: string) => {
    setBlogData((prevData) => ({
      blogs: prevData.blogs.filter((blog) => blog._id !== id),
    }));
  };
  const handleVisibilty = (id: string) => {
    document.getElementById(id)?.classList.add("removeAnimation");
    setTimeout(() => {
      removeBookMark(id);
    }, 300);
  };

  return (
    <div className="bookMark_page">
      <h2>BookMarks</h2>
      <div className="display_posts_home">
        {blogData && blogData.blogs ? (
          blogData.blogs.map((post) => (
            <div className="post_div" key={post._id}>
              <Carousel
                blogDta={post}
                savedUserBlog={storeBookmarks}
                userID={userId}
                visibilty={handleVisibilty}
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default SavedPost;
