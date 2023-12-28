import { imgDB } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";

interface SaveBlogRequest {
  BlogId: string;
  userId: string;
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
