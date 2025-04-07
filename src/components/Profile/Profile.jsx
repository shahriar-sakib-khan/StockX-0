import styles from "./Profile.module.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../Login/UserContext";
import axios from "axios";

function Profile() {
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

    return (
        <>
            <div className={styles.container}>
                {user ? (
                    <div className={styles.info}>
                        <h2>Welcome, {user.username}!</h2>
                        <p>Shop name: {user.shop_name}</p>
                        <p>Email: {user.email}</p>
                        <p>NID: {user.nid}</p>
                        <p>Contact: {user.phone_num}</p>
                        <p>Address: {user.address}</p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </>
    );
}

export default Profile;
