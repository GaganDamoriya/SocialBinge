import "./style.css";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
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
interface BlogCardProps {
  BlogData: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ BlogData }) => {
  return (
    <div
      className="blogcard"
      style={{
        backgroundImage: `url(${BlogData.imageUrl})`,
      }}
      key={BlogData._id}
    >
      <span className="inside">
        <FaHeart size={"1.5rem"} />
        <FaBookmark size={"1.5rem"} />
      </span>
    </div>
  );
};

export default BlogCard;
