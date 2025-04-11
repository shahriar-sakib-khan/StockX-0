import style from './register.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [form, setForm] = useState({  
        username: "",
        shop_name: "", 
        email: "", 
        password: "",
        nid: "",
        phone_num: "",
        address: "" 
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addClient = async () => {
        await axios.post("https://stock-x-oyz9.onrender.com/add-client", form);
        navigate("/");
    };

    const navigate = useNavigate();

    return (
        <>
            <header className={style.forBG}></header>
            <div className={`${style.container}`}>
                <div className={`${style.register}`}><h1>Register</h1></div>
                <form className={style.form}>
                    <div>
                        <label>Username: </label> 
                        <input type="text" name="username" value={form.username} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Shop name: </label> 
                        <input type="text" name="shop_name" value={form.shop_name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email: </label> 
                        <input type="email" name="email" value={form.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Password: </label> 
                        <input type="password" name="password" value={form.password} onChange={handleChange} />
                    </div>
                    <div>
                        <label>NID: </label> 
                        <input type="text" name="nid" value={form.nid} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Contact: </label> 
                        <input type="text" name="phone_num" value={form.phone_num} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Shop address: </label> 
                        <input type="text" name="address" className={style.address} value={form.address} onChange={handleChange} />
                    </div>
                    <div className={style.btn}><button type="button" onClick={addClient} className={style.submit}>Submit</button></div>
                </form>
            </div>
        </>
    ); 
}
