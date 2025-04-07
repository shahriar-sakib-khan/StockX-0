import React  , {useState} from 'react';
import UserInfoStyles from './UserInfo.module.css';
import pro_pic from "../../assets/spider.jpg";



const UserInfo = () =>{

    const[user , setUser] = useState({
        firstName: "SH",
        lastName: "Jisan",
        email: "shzisun123@gmail.com",
        nidNumber: "2342523425",
        phoneNumber: "0134556452",
    });


    return(
        <>
            <div className = {UserInfoStyles.userinfo_container}>
                <h2>User Info</h2>

                <div className={UserInfoStyles.pic_container}>
                    <img src={user.profilePic || pro_pic} alt={pro_pic}/>
                    <p className={UserInfoStyles.pic_title}><strong>{user.firstName} {user.lastName}</strong></p>
                </div>

                <div className={UserInfoStyles.profile_info_container}>
                    <p><strong>First Name: </strong>{user.firstName}</p>
                    <p><strong>Last Name: </strong>{user.lastName}</p>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Nid Number: </strong>{user.nidNumber}</p>
                    <p><strong>Phone Number: </strong>{user.phoneNumber}</p>
                    <p><strong>Scroll Test</strong></p>
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