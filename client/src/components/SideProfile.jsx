import { React, useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const element = <FontAwesomeIcon icon={faUser} />
const SideProfile = () => {
    const { currentUser } = useContext(AuthContext);

    const [postNumber, setPostNumber] = useState([]);
    if (currentUser) {
        const fetchData = async () => {
        try {
            const res = await axios.get(`/posts/user/${currentUser.id}`);
            setPostNumber(res.data.length);
        } catch (err) {
            console.log(err);
        }
        };
        fetchData();
    }

    return (
        <div className="side_profile">
            {currentUser ? 
            (   
                <div>
                    <div className="about">
                        {currentUser.profile_img != null ? (
                            <img className="profile_image" src={currentUser.profile_img} alt="profile-img"/>
                        ) : (
                            <div className="profile_image">{element}</div>
                        )}
                        <div className="name">{currentUser.first_name} {currentUser.last_name}</div>
                    </div>
                    <div className="extra-info">
                        <div>Number of Birds Seen: <span>{postNumber}</span></div>
                    </div>
                </div>
            ) : (
                <div>
                </div>
            )}
                
            
        </div>
    )
}

export default SideProfile