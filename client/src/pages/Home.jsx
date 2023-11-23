import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SideProfile from "../components/SideProfile";


import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  return (
    <div className="main-container">
      <SideProfile></SideProfile>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.description)}</p>
              <p className="author">By {post.first_name} {post.last_name}</p>
              <button>Read More</button>
            </div>
            <div className="img">
              <img src={`${post.img}`} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
