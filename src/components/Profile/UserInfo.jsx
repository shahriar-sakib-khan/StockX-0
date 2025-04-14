import React  , {useState} from 'react';
import UserInfoStyles from './UserInfo.module.css';
import pro_pic from "../../assets/spider.jpg";
import { useContext, useEffect } from "react";
import { UserContext } from "../Login/UserContext";
import axios from "axios";


const UserInfo = () =>{

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");  // Retrieve user ID from storage
            if (userId && !user) { // Fetch data only if user is not already set
                try {
                    const res = await axios.get(`https://stock-x-oyz9.onrender.com/clients/${userId}`);
                    setUser(res.data);
                } catch (error) {
                    console.error("Failed to fetch user data", error);
                }
            }
        };

        fetchUserData();
    }, [user, setUser]); // Fetch only if user is missing

    // const[user , setUser] = useState({
    //     firstName: "SH",
    //     lastName: "Jisan",
    //     email: "shzisun123@gmail.com",
    //     nidNumber: "2342523425",
    //     phoneNumber: "0134556452",
    // });


    return(
        <>
            <div className = {UserInfoStyles.userinfo_container}>
                <h2>User Info</h2>

                <div className={UserInfoStyles.pic_container}>
                    <img src={user.profilePic || pro_pic} alt={pro_pic}/>
                    <p className={UserInfoStyles.pic_title}><strong>{user.username}</strong></p>
                </div>

                <div className={UserInfoStyles.profile_info_container}>
                    <p><strong>Name: </strong>{user.username}</p>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Nid Number: </strong>{user.nid}</p>
                    <p><strong>Phone Number: </strong>{user.phone_num}</p>
                    {/* <p><strong>Scroll Test</strong></p> */}
                </div>

                <div className={UserInfoStyles.profile_button_container}>
                        <>
                            <button className={UserInfoStyles.profile_button}>Edit Profile</button>
                            <button className={UserInfoStyles.profile_button}>Change Password</button>
                        </>
                </div>
            </div>
        </>
    );
};


export default UserInfo;