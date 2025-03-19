import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";  // (1) Import useContext
import { UserContext } from "./UserContext";  // (2) Import UserContext
import style from './recovery.module.css';
import axios from "axios";

export default function Recovery() {
    const { setUser } = useContext(UserContext);  // (3) Get setUser function from context
    const [clients, setClients] = useState([]);
    
    useEffect(() => {
        const fetchClients = async () => {
            const res = await axios.get("https://stock-x-oyz9.onrender.com/clients");
            setClients(res.data);
        };
        fetchClients();
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = document.getElementById("user").value;
        const nid = document.getElementById("nid").value;

        // Check if entered email and password match a client
        const foundClient = clients.find(client => 
            (client.email == username || client.username == username) 
            && client.password == nid
        );

        if (foundClient) {
            setUser(foundClient);  // (4) Store user data in context
            navigate("/selection");
        } else {
            alert(`Invalid username or NID!`);
        }
    };

    return (
        <>
            <p className={style.name}>Stock-X</p>
            <div className={`${style.container}`}>
                <div className={style.heading}><h2>Recover</h2></div>
                <form onSubmit={handleSubmit} className={style.form}>
                    <div className={style.user}>
                        <input type="text" className={style.username} placeholder='Username or email' id="user" required />
                    </div>
                    <div className={style.pass}>
                        <input type="text" className={style.password} placeholder='NID' id="nid" required />
                    </div>
                    
                    <div className={style.log}>
                        <input type='submit' className={style.login} value="Enter" />
                    </div>
                </form>
            </div>
        </>
    );
}

