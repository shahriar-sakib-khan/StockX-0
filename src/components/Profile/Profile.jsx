import react , {useState} from 'react';
import ProfileStyles from './profile.module.css';
import UserInfo from "./UserInfo.jsx";
import ShopInfo from "./ShopInfo.jsx";

const Profile = () =>{
    return(
        <>
            <div className={ProfileStyles.profile_container}>
                <UserInfo/>
                <ShopInfo/>
            </div>
        </>
    );
}

export default Profile;