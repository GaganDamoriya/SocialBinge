import React, { useState, useEffect } from "react";
import { fetchBlog, userLikedArray } from "../constants/PostImg";
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
interface LikedPostDisplayProps {
  id: string | null;
}

const LikedPostDisplay: React.FC<LikedPostDisplayProps> = ({ id }) => {
  const [blogData, setBlogData] = useState<BlogData>({ blogs: [] });
  const [storeLiked, setStoreLiked] = useState<string[]>([]);
  useEffect(() => {
    userLikedArray(id)
      .then((response: string[]) => {
        console.log(response);
        setStoreLiked(response);

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

  const removeLikedpost = (id: string) => {
    setBlogData((prevData) => ({
      blogs: prevData.blogs.filter((blog) => blog._id !== id),
    }));
  };
  const handleVisibilty = (id: string) => {
    document.getElementById(id)?.classList.add("removeAnimation");
    setTimeout(() => {
      removeLikedpost(id);
    }, 300);
  };

  return (
    <div className="bookMark_page">
      <h2>Liked posts</h2>
      <div className="display_posts_home">
        {blogData && blogData.blogs ? (
          blogData.blogs.map((post) => (
            <div className="post_div" key={post._id}>
              <Carousel
                blogDta={post}
                savedUserBlog={[]}
                userID={id}
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

export default LikedPostDisplay;
