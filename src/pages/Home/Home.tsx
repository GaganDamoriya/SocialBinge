import React, { useEffect, useState } from "react";
import "./style.css";
import Carousel from "../../components/carousel/Carousel";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/blog/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogData(data as BlogData);
        console.log(blogData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

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
                <Carousel key={post._id} blogDta={post} />
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
