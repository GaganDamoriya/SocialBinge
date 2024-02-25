import { imgDB } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";

interface SaveBlogRequest {
  BlogId: string;
  userId: string;
}
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
interface Notification {
  _id: string;
  type: string;
  postId: string;
  senderdetail: any;
}
interface notiArray {
  notification: Notification[];
}
export const postImage = async (img: File | null) => {
  if (img!) {
    try {
      const URi = `soicalbinge_website_images/${v4()}daymn`;
      const imgRef = ref(imgDB, URi);
      console.log(img);
      await uploadBytes(imgRef, img);
      //getting url back
      const downloadURL = await getDownloadURL(imgRef);
      return downloadURL;
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Imgae not found");
  }
};

export const formatDate = (date: Date): string => {
  // Check if the input date is a valid Date object
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const now: Date = new Date();

  const elapsedMilliseconds: number = now.getTime() - date.getTime();
  const seconds: number = Math.floor(elapsedMilliseconds / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const weeks: number = Math.floor(days / 7);

  const rtf: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  if (seconds < 60) {
    return rtf.format(-seconds, "second");
  } else if (minutes < 60) {
    return rtf.format(-minutes, "minute");
  } else if (hours < 24) {
    return rtf.format(-hours, "hour");
  } else if (days < 7) {
    return rtf.format(-days, "day");
  } else {
    return rtf.format(-weeks, "week");
  }
};

export const parseTags = (
  tagsString: string,
  separator: string = ","
): string[] => {
  // Split the tags string into an array using the specified separator
  const tagsArray = tagsString.split(separator);

  // Trim each tag to remove leading and trailing whitespaces
  const trimmedTags = tagsArray.map((tag) => tag.trim());

  // Remove empty tags
  const nonEmptyTags = trimmedTags.filter((tag) => tag.length > 0);

  return nonEmptyTags;
};

export const bookMarkPost = async (id: string, userId: null | string) => {
  //post axios request to add Blog to User.bookMarks

  try {
    if (!userId) {
      // Handle the case where userId is not available
      console.error("User ID not available.");
      return;
    }

    const requestData: SaveBlogRequest = {
      BlogId: id,
      userId: userId,
    };
    await axios.post(`http://localhost:5000/user/save/${userId}`, requestData);
  } catch (error) {
    // Handle errors
    console.error("Error bookmarking post:", error);
  }
};

export const userBookmarkArray = async (
  userId: string | null
): Promise<string[]> => {
  try {
    const response = await axios.get(`http://localhost:5000/user/${userId}`);
    return response.data.user.bookMarks;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};
export const userLikedArray = async (
  userId: string | null
): Promise<string[]> => {
  try {
    const response = await axios.get(`http://localhost:5000/user/${userId}`);
    return response.data.user.like;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};
export const userPostArray = async (
  userId: string | null
): Promise<string[]> => {
  try {
    const response = await axios.get(`http://localhost:5000/user/${userId}`);
    return response.data.user.blogs;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};
export const getUser = async (id: string | undefined | null) => {
  if (id) {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      return response.data.user;
    } catch (err) {
      console.log(err);
    }
  }
};

export const fetchBlog = async (savedBlog: string[]): Promise<BlogData> => {
  const bookMarkedBlogData: Blog[] = [];

  await Promise.all(
    savedBlog.map(async (blog_id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/blog/${blog_id}`
        );
        bookMarkedBlogData.push(response.data.blog);
      } catch (e) {
        console.log("error", e);
      }
    })
  );

  return { blogs: bookMarkedBlogData };
};
export const truncateString = (inputString: string) => {
  if (inputString.length <= 20) {
    return inputString;
  } else {
    return inputString.substring(0, 20) + "...";
  }
};

export const fetchNotification = async (notifi: string[]) => {
  const notificationArr: Notification[] = [];

  await Promise.all(
    notifi.map(async (id) => {
      try {
        const res = await axios.get(`http://localhost:5000/notification/${id}`);
        notificationArr.push(res.data.notify);
      } catch (e) {
        console.log(e);
      }
    })
  );

  return { notification: notificationArr };
};
