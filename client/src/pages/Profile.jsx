import { React, useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideProfile from "../components/SideProfile";
import axios from "axios";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [imageURL, setImageURL] = useState(null);
    const state = useLocation().state;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
            const res = await axios.get(`/api/posts/user/${currentUser.id}`);
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

      const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setImageURL(URL.createObjectURL(e.target.files[0]));
        }
      }
    
      const upload = async () => {
        try {
          let base64 = await imageUrlToBase64(imageURL).then((res) => {
          return res});
          let imageData = {image: base64, type: 'profile'};
          const res = await axios.post("/api/upload", imageData);
          return res.data.imageURL;
        } catch (err) {
        }
      };
    
      const imageUrlToBase64 = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
          };
          reader.onerror = reject;
        });
      };

      const handleClick = async (e) => {
        e.preventDefault();
        let src = await upload();
        try {
            await axios.put(`/api/users/image/${currentUser.id}`, {
                img: src ? src : "",
            })
            window.location.reload(true);
        } catch (err) {
          console.log(err);
        }
      };


    return (
        <div className="main-container">
            <SideProfile></SideProfile>
            <div className="profile-container">
                <img src={currentUser.profile_img}/>
                <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept="image/*"
                    name=""
                    onChange={onImageChange}
                />
                <label className="file" htmlFor="file">
                    {imageURL ? `Change Profile Image` : `Upload New Profile Image`}
                </label>
                {imageURL && <img className="imagePreview" alt="preview image" src={imageURL}/>}
                <div className="buttons">
                    <button onClick={handleClick}>Save Image</button>
                </div>
                <h2>Welcome {currentUser.first_name}!</h2>
                <h2>Your Bird Posts: </h2>
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
        </div>
       
    )
}

export default Profile