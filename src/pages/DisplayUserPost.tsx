import React, { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import { userPostArray, fetchBlog } from "../constants/PostImg";
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
interface DisplayUserPostProps {
  id: string | null;
}

//provide userId of user
const DisplayUserPost: React.FC<DisplayUserPostProps> = ({ id }) => {
  const [blogData, setBlogData] = useState<BlogData>({ blogs: [] });
  const { userId } = useUser();

  useEffect(() => {
    userPostArray(id)
      .then((response: string[]) => {
        fetchBlog(response).then((res: BlogData) => {
          //   console.log("blogsDATA : ", res);
          setBlogData(res);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="DisplayUserPost">
      {blogData && blogData.blogs ? (
        blogData.blogs.map((post) => (
          <div className="post_div" key={post._id}>
            <Carousel
              blogDta={post}
              savedUserBlog={[]}
              userID={userId}
              visibilty={() => {}}
            />
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default DisplayUserPost;
