import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";  // (1) Import useContext
import { UserContext } from "./UserContext";  // (2) Import UserContext
import style from './login.module.css';
import axios from "axios";

export default function Login() {
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

    const createAccount = (event) => {
        event.preventDefault();
        navigate("/register");
    };

    const recovery = (event) => {
        event.preventDefault();
        navigate("/recovery");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = document.getElementById("user").value;
        const passwordInput = document.getElementById("pass").value;

        // Check if entered email and password match a client
        const foundClient = clients.find(client => 
            (client.email === username || client.username === username || 
            client.shop_name === username) && client.password === passwordInput
        );

        if (foundClient) {
            localStorage.setItem("userId", foundClient._id); // Store only the user ID
            setUser(foundClient);  // (4) Store user data in context
            navigate("/selection");
        } else {
            alert("Invalid email or password!");
        }
    };

    return (
        <>
            <p className={style.name}>Stock-X</p>
            <div className={`${style.container}`}>
                <div className={`${style.heading}`}><h2>Login</h2></div>
                <form onSubmit={handleSubmit} className={style.form}>
                    <div className={style.user}>
                        <input type="text" className={style.username} placeholder='Username' id="user" required />
                    </div>
                    <div className={style.pass}>
                        <input type="password" className={style.password} placeholder='Password' id="pass" required />
                    </div>
                    <div className={style.helps}>
                        <div className={style.remember}>
                            <label htmlFor="remember">Remember me</label>
                            <input type="checkbox" id='remember' />
                        </div>
                        <div><a className={style.forget} onClick={recovery}>Forgot Password? </a></div>
                    </div>
                    <div className={style.log}>
                        <input type='submit' className={style.login} value="Login" />
                    </div>
                </form>
                <div className={style.register}>
                    <p>Don't have an account? </p>
                    <button onClick={createAccount}>Register</button>
                </div>
            </div>
        </>
    );
}
