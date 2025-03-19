import React from "react";
import style from './Dashboard.module.css'
import { useNavigate } from "react-router-dom";


export default function Dashboard(){
    const navigate = useNavigate();
    return(
        <>
            <div className={style.body}>
                <div className={style.container}>
                    
                    <div className={style.div1}>
                        <div className={style.receipt}>
                            <p>Todays sells: <br /> 0tk</p>
                        </div>
                        <div className={style.info}>Info</div>
                    </div>
                    
                    <div className={style.div2}>
                        <button className={style.buy}>Buy</button>
                        <button className={style.sell}>Sell</button>
                    </div>
                    <div className={style.div3} >
                        <button  onClick={(e)=>{
                            e.preventDefault();
                            navigate("/selection");
                        }}>Selection</button>
                        
                        <button onClick={(e)=>{
                            e.preventDefault();
                            navigate("/inventory");
                        }}>Inventory</button>

                        <button onClick={(e)=>{
                            e.preventDefault();
                            navigate("/exchange");
                        }}>Exchange</button>

                        <button onClick={(e)=>{
                            e.preventDefault();
                            navigate("/profile");
                        }}>Profile</button>

                        <button onClick={(e)=>{
                            e.preventDefault();
                            navigate("/shop");
                        }}>Shop</button>

                        <button onClick={(e)=>{
                            e.preventDefault();
                            navigate("/exchange-history");
                        }}>History</button>

                        <button onClick={(e)=>{
                            e.preventDefault();
                            navigate("/");
                        }}>Log out</button>
                    </div>
                </div>
            </div>
        </>
    )
}