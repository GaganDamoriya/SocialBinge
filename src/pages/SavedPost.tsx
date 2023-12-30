import React, { useEffect } from "react";
import "./page.css";
import { useUser } from "../components/UserContext";

import axios from "axios";
const SavedPost = () => {
  const { userId } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${userId}`
        );
        console.log(response.data); // Do something with the response data
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData(); // Call the asynchronous function immediately
  }, []);

  return <div className="bookMark_page">SavedPost</div>;
};

export default SavedPost;
