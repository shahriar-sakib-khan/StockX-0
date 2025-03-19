import React from "react";
import style from './Dashboard.module.css'

export default function Dashboard(){
    return(
        <>
            <div className={style.body}>
                <div className={style.container}>
                    <div className={style.header}>Stock-X</div>
                    
                    <div className={style.div1}>
                        <div className={style.receipt}>
                            <p>Todays sells: <br /> 0tk</p>
                        </div>
                        <div className={style.info}>Info</div>
                    </div>
                    
                    <div className={style.div2}>
                        <div className={style.buy}>Buy</div>
                        <div className={style.sell}>Sell</div>
                    </div>
                    <div className={style.div3}>
                        <div>Selection</div>
                        <div>Inventory</div>
                        <div>Shop</div>
                        <div>History</div>
                        <div>Profile</div>
                        <div>Exchange</div>
                        <div>Log out</div>
                        <div>8</div>
                        <div>9</div>
                    </div>
                </div>
            </div>
        </>
    )
}