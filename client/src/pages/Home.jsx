import React from "react";
import { useEffect, Component, useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideProfile from "../components/SideProfile";
import { AuthContext } from "../context/authContext";


import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts`);
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
          <Link key={post.id} className="link" to={`/post/${post.id}`}>
            <div className="post">
              <div className="content"> 
                  <h1>{post.title}</h1>
                
                <p>{getText(post.description)}</p>
                <p className="author">By {post.first_name} {post.last_name}</p>
                <button>Read More</button>
              </div>
              <div className="img">
                <img src={`${post.img}`} alt="" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
