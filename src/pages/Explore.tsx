import axios from "axios";
import React, { useState } from "react";
import searchIcon from "../assets/search-icon.webp";

const Explore = () => {
  return (
    <div className="explore_page">
      <h1>Search Posts</h1>
      <div>
        <img className="search-icon" src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Enter the query"
          className="input_search"
        />
      </div>
    </div>
  );
};

export default Explore;
