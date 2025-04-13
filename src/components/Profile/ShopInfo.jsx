import React ,{useState} from 'react';
import ShopInfoStyles from './ShopInfo.module.css';
import pro_pic from "../../assets/spider.jpg";
import { useContext, useEffect } from "react";
import { UserContext } from "../Login/UserContext";
import axios from "axios";



const ShopInfo = () =>{
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
    //     shopName: "abc shop",
    //     division: "Dhaka",
    //     district: "gopalganj",
    //     area: "gobra",
    //     shopAddress: "147/3 main street",
    // });


    return(
        <>
            <div className={ShopInfoStyles.shopinfo_container}>
                <h2>Shop Info</h2>

                <div className={ShopInfoStyles.pic_container}>
                    <img src={pro_pic} alt= "Profile Pic"/>
                    <p className={ShopInfoStyles.pic_title}><strong>Jisan Shop</strong></p>
                </div>

                <div className={ShopInfoStyles.profile_info_container}>
                    <p><strong>Shop Name: </strong>{user.shop_name}</p>
                    <p><strong>Shop Address: </strong>{user.address}</p>
                    {/* <p><strong>Division: </strong>{user.division}</p>
                    <p><strong>District: </strong>{user.district}</p>
                    <p><strong>Area: </strong>{user.area}</p> */}
                    {/* <p><strong>Scroll Test</strong></p> */}
                </div>

                <div className={ShopInfoStyles.profile_button_container}>
                        <>
                            <button className={ShopInfoStyles.shop_button}>Edit Shop Info</button>
                            <button className={ShopInfoStyles.shop_button}>View Shop Location</button>
                        </>
                </div>
            </div>
        </>
    );
}

export default ShopInfo;