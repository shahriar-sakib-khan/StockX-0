import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import images from "./Images";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const navigate = useNavigate();

  let sale = 0;
  let expense = 0;
  let due = 0;
  let stock = 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.dailySection}>
          <div className={styles.dailySales}>
            <span>Todays sells:</span>
            <span className={styles.amount_blue}>
              Tk <span className={styles.amount}>{sale}</span>
            </span>
          </div>
          <div className={styles.dailyInfo}>
            <div>
              <span>Today&apos;s Expenses</span>
              <span className={styles.amount_red}>
                Tk <span className={styles.amount}>{expense}</span>
              </span>
            </div>
            {/* <div className={styles.separator}></div> */}
            <div className={styles.dailyDues}>
              <span>Today&apos;s Dues</span>
              <span className={styles.amount_blue}>
                Tk <span className={styles.amount}>{due}</span>
              </span>
            </div>
            {/* <div className={styles.separator}></div> */}
            <div>
              <span>Stock count</span>
              <span className={`${styles.amount} ${styles.amount_green}`}>
                {stock}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.middleSection}>
          <div className={styles.buy}>
            <img src={images.img_buy} alt="" />
            <span>Buy</span>
          </div>
          <div className={styles.sell}>
            <img src={images.img_sell} alt="" />
            <span>Sell</span>
          </div>
        </div>

        <div className={styles.navigationSection}>
          <NavLink to={"/selection"} className={styles.navItem}>
            <img src={images.img_selection} />
            <span>Selection</span>
          </NavLink>

          <NavLink to={"/inventory"} className={styles.navItem}>
            <img src={images.img_inventory} />
            <span>Inventory</span>
          </NavLink>

          <NavLink to={"/exchange"} className={styles.navItem}>
            <img src={images.img_exchange} />
            <span>Exchange</span>
          </NavLink>

          <NavLink to={"/shop"} className={styles.navItem}>
            <img src={images.img_shop} />
            <span>Shop</span>
          </NavLink>

          <NavLink to={"/exchange-history"} className={styles.navItem}>
            <img src={images.img_history} />
            <span>History</span>
          </NavLink>

          <NavLink to={"/profile"} className={styles.navItem}>
            <img src={images.img_profile} />
            <span>Profile</span>
          </NavLink>

          <NavLink to={"/"} className={styles.navItem}>
            <img src={images.img_logout} />
            <span>Log out</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
