import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const navigate = useNavigate()

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader(); 
      reader.onloadend = () => {
        setImageURL(reader.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const upload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', "post");
    try {
      const res = await axios.post("/api/upload", formData);
      return res.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  const handleClick = async (e) => {
    e.preventDefault();
    let src = await upload(image);
    try {
      state
        ? await axios.put(`/api/posts/${state.id}`, {
            title,
            desc: value,
            img: src ? src : "",
          })
        : await axios.post(`/api/posts/`, {
            title,
            desc: value,
            img: src ? src : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
      <div className="write-title">Share your new bird friend!</div>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept="image/*"
            name=""
            onChange={onImageChange}
          />
          <label className="file" htmlFor="file">
            {imageURL ? `Change Image` : `Upload Image`}
          </label>
          {imageURL && <img className="imagePreview" alt="preview image" src={imageURL}/>}
          <div className="buttons">
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
