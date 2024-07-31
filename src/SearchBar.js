// src/SearchBar.js

import React, { useState, useEffect } from "react";
import "./SearchBar.css"; // Importing CSS for styling
import axios from "axios";
const backendUrl = "http://localhost:5050/api/v1";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [interactiveDots, setInteractiveDots] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    // VALIDATION BLOCK
    if (!query.length) {
      alert("You need to enter a url");
      return;
    }

    if (!(query.startsWith("http://") || query.startsWith("https://"))) {
      alert("Enter a correct url");
      return;
    }

    try {
      setLoading(true);
      const results = await axios.get(
        `${backendUrl}/crawler?website=${query}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([results.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "output.zip"); // or any other extension
      document.body.appendChild(link);
      link.click();

      console.log(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Somethinhg went wrong " + error.message);
    }
  };

  useEffect(() => {
    const dotSequence = ["", ".", "..", "..."];
    let index = 0;

    const interval = setInterval(() => {
      setInteractiveDots(dotSequence[index]);
      index = (index + 1) % dotSequence.length;
    }, 500); // Change dots every 500 milliseconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <>
      {loading && <h4>Please wait, loading {interactiveDots}</h4>}
      <div className="search-container">
        <input
          type="text"
          placeholder="Input your Url here.."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Crawl
        </button>
      </div>
    </>
  );
};

export default SearchBar;
