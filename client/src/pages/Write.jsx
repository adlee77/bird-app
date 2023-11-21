import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";


const firebaseConfig = {
  apiKey: "AIzaSyACFqB5BHtaluf2FzxnkAQ6mYMMEHsBJ6g",
  authDomain: "bird-friends-1f511.firebaseapp.com",
  projectId: "bird-friends-1f511",
  storageBucket: "bird-friends-1f511.appspot.com",
  messagingSenderId: "503411450824",
  appId: "1:503411450824:web:f43d324b2c74d9493196fd",
  measurementId: "G-YVD8ZXW593"
};

const firebaseapp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseapp);

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const navigate = useNavigate()

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageURL(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  }

  const upload = async () => {
    try {
      let imageName =  `bird_images/${v4()}`;
      const storageRef = ref(storage, imageName);
      const snapshot = await uploadBytes(storageRef, image)
      const url = await getDownloadURL(snapshot.ref);
      console.log(url)
      return url;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let src = await upload();
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            img: src ? src : "",
          })
        : await axios.post(`/posts/`, {
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
          {image && <img className="imagePreview" alt="preview image" src={imageURL}/>}
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
