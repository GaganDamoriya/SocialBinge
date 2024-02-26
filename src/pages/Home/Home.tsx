import React, { useEffect, useId, useState } from "react";
import "./style.css";
import Carousel from "../../components/carousel/Carousel";
import { bookMarkPost } from "../../constants/PostImg";
import { useUser } from "../../components/UserContext";
import axios from "axios";
import Loader from "../../components/ui/Loader";

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

const Home = ({ blogs: [] }) => {
  const [blogData, setBlogData] = useState<BlogData>({ blogs: [] });
  const [loading, setLoading] = useState(true);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const { userId } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://socialbinge-server-gagan-prakash.onrender.com/blog/"
        );

        setBlogData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchuserData = async () => {
      try {
        const response = await axios.get(
          `https://socialbinge-server-gagan-prakash.onrender.com/user/${userId}`
        );
        setUserBookmarks(response.data.user.bookMarks);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
    fetchuserData();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  const handleVisibilty = (id: string) => {};
  return (
    <div className="Home-div">
      <h1 className="heading_home">Home Feed</h1>
      {/* Render your blog data here */}
      {loading ? (
        // <div>Loading.....</div>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="display_posts_home">
          {blogData && blogData.blogs ? (
            blogData.blogs.map((post) => (
              <div className="post_div" key={post._id}>
                <Carousel
                  blogDta={post}
                  savedUserBlog={userBookmarks}
                  userID={userId}
                  visibilty={handleVisibilty}
                />
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
