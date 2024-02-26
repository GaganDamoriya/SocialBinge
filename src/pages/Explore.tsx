import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import BlogCard from "../components/carousel/BlogCard";
import "./page.css";

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
  blog: Blog[];
}

const Explore = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [qData, setQData] = useState<BlogData>({ blog: [] });

  useEffect(() => {
    if (query !== "") {
      setLoading(true);
      const search = setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://socialbinge-server-gagan-prakash.onrender.com/blog/search/${query}`
          );
          console.log(response);
          setQData(response.data);
          setLoading(false);
          console.log(qData);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }, 500);
      return () => clearTimeout(search);
    }
  }, [query]);

  const handlequery = (e: any) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
    }
  };

  return (
    <div className="explore_page">
      <h1>Search Posts</h1>
      <div className="input-tab">
        <BiSearch size={"1.5rem"} />
        <input
          type="text"
          placeholder="Enter the query"
          onKeyDown={handlequery}
        />
      </div>
      <div className="explore-tab">
        <h2>{query == "" ? "Search Query" : query}</h2>
        {loading ? (
          <div style={{ color: "wheat" }}> Loading..</div>
        ) : (
          <div>
            {qData.blog && qData.blog.length > 0 ? (
              <div className="display_search">
                {qData.blog.map((post) => {
                  return <BlogCard BlogData={post} />;
                })}
              </div>
            ) : (
              <div style={{ color: "white" }}>Nothing to be found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
