import React, { useEffect, useId, useState } from "react";
import "./style.css";
import Carousel from "../../components/carousel/Carousel";
import { bookMarkPost } from "../../constants/PostImg";
import { useUser } from "../../components/UserContext";
import axios from "axios";

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
        const response = await axios.get("http://localhost:5000/blog/");

        setBlogData(response.data);
        console.log(blogData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchuserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${userId}`
        );
        console.log(response);
        console.log(response.data); // User Response data
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
        <div>Loading.....</div>
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
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
