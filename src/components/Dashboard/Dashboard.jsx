import React from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import images from "./Images";
import { getCylinderCount } from "./dashboardUtils";
import styles from "./Dashboard.module.css";
import Statistics from "../Statistics/Statistics"; 

export default function Dashboard() {
  const navigate = useNavigate();
  const { selectedBrands } = useOutletContext();

  let sale = 0;
  let expense = 0;
  let due = 0;
  let stock = getCylinderCount(selectedBrands);

  return (
    <div className={styles.wrapper}>
      <main className={styles.dashboardContainer}>
        <section className={styles.dailySection}>
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
            <div className={styles.dailyDues}>
              <span>Today&apos;s Dues</span>
              <span className={styles.amount_blue}>
                Tk <span className={styles.amount}>{due}</span>
              </span>
            </div>
            <div>
              <span>Stock count</span>
              <span className={`${styles.amount} ${styles.amount_green}`}>
                {stock}
              </span>
            </div>
          </div>
        </section>

        <section className={styles.middleSection}>
          <NavLink to={"/buy"}>
            <img src={images.img_buy} alt="" />
            <span>Buy</span>
          </NavLink>
          <NavLink to={"/shop-selection"}>
            <img src={images.img_sell} alt="" />
            <span>Sell</span>
          </NavLink>
          <NavLink to={"/due-history"}>
            <img src={images.img_due} alt="" />
            <span>Due</span>
          </NavLink>
        </section>

        <section className={styles.navigationSection}>
          <NavLink to={"/selection"} className={styles.navItem}>
            <img src={images.img_selection} alt="" />
            <span>Selection</span>
          </NavLink>

          <NavLink to={"/inventory"} className={styles.navItem}>
            <img src={images.img_inventory} alt="" />
            <span>Inventory</span>
          </NavLink>

          <NavLink to={"/shop-selection"} className={styles.navItem}>
            <img src={images.img_exchange} alt="" />
            <span>Cylinder Exchange</span>
          </NavLink>

          <NavLink to={"/shop"} className={styles.navItem}>
            <img src={images.img_shop} alt="" />
            <span>Shop</span>
          </NavLink>

          <NavLink to={"/vehicles"} className={styles.navItem}>
            <img src={images.img_vehicles} alt="" />
            <span>Vehicles</span>
          </NavLink>

          <NavLink to={"/vehicle-cost"} className={styles.navItem}>
            <img src={images.img_vehicleCost} alt="" />
            <span>Vehicle Cost</span>
          </NavLink>

          <NavLink to={"/exchange-history"} className={styles.navItem}>
            <img src={images.img_history} alt="" />
            <span>History</span>
          </NavLink>

          <NavLink to={"/buy-history"} className={styles.navItem}>
            <img src={images.img_buyHistory} alt="" />
            <span>Buy History</span>
          </NavLink>

          <NavLink to={"/daily-sales"} className={styles.navItem}>
            <img src={images.img_dailySales} alt="" />
            <span>Daily Sales</span>
          </NavLink>

          <NavLink to={"/profile"} className={styles.navItem}>
            <img src={images.img_profile} alt="" />
            <span>Profile</span>
          </NavLink>

          <NavLink to={"/lpg-community"} className={styles.navItem}>
            <img src={images.img_community} alt="" />
            <span>Community</span>
          </NavLink>

          <NavLink to={"/"} className={styles.navItem}>
            <img src={images.img_logout} alt="" />
            <span>Log out</span>
          </NavLink>
        </section>

        <section className={styles.statisticsSection}>
          <h1 className={styles.statisticsTitle}>Statistics</h1>
          <Statistics />
        </section>

      </main>
    </div>
  );
}
