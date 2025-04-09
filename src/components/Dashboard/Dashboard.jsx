import React from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import images from "./Images";
import { getCylinderCount } from "./dashboardUtils";
import styles from "./Dashboard.module.css";

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
          <NavLink to={"/inventory"}>
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
            <img src={images.img_selection} />
            <span>Selection</span>
          </NavLink>

          <NavLink to={"/inventory"} className={styles.navItem}>
            <img src={images.img_inventory} />
            <span>Inventory</span>
          </NavLink>

          <NavLink to={"/shop-selection"} className={styles.navItem}>
            <img src={images.img_exchange} />
            <span>Cylinder Exchange</span>
          </NavLink>

          <NavLink to={"/shop"} className={styles.navItem}>
            <img src={images.img_shop} />
            <span>Shop</span>
          </NavLink>

          <NavLink to={"/vehicles"} className={styles.navItem}>
            {/* <img src={images.img_shop} /> */}
            <span>Vehicles</span>
          </NavLink>

          <NavLink to={"/vehicle-cost"} className={styles.navItem}>
            {/* <img src={images.img_shop} /> */}
            <span>Vehicle Cost</span>
          </NavLink>

          <NavLink to={"/exchange-history"} className={styles.navItem}>
            <img src={images.img_history} />
            <span>History</span>
          </NavLink>

          <NavLink to={"/buy-history"} className={styles.navItem}>
            {/* <img src={images.img_history} /> */}
            <span>Buy History</span>
          </NavLink>

          <NavLink to={"/daily-sales"} className={styles.navItem}>
            {/* <img src={images.img_history} /> */}
            <span>Daily Sales</span>
          </NavLink>

          <NavLink to={"/profile"} className={styles.navItem}>
            <img src={images.img_profile} />
            <span>Profile</span>
          </NavLink>

          <NavLink to={"/lpg-community"} className={styles.navItem}>
            <img src={images.img_community} />
            <span>Community</span>
          </NavLink>

          <NavLink to={"/"} className={styles.navItem}>
            <img src={images.img_logout} />
            <span>Log out</span>
          </NavLink>
        </section>
      </main>
    </div>
  );
}
