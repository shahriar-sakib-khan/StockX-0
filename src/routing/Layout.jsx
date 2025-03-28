import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Layout.module.css";

function Layout() {
  const [selectedBrands, setSelectedBrands] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedBrands")) || [];
  });

  const [stockCount, setStockCount] = useState(() => {
    return JSON.parse(localStorage.getItem("stockCount")) || {};
  });

  const [prices, setPrices] = useState(() => {
    return JSON.parse(localStorage.getItem("prices")) || {};
  });

  useEffect(() => {
    localStorage.setItem("selectedBrands", JSON.stringify(selectedBrands));
  }, [selectedBrands]);

  useEffect(() => {
    localStorage.setItem("stockCount", JSON.stringify(stockCount));
  }, [stockCount]);

  useEffect(() => {
    localStorage.setItem("prices", JSON.stringify(prices));
  }, [prices]);

  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <Navbar />
      </nav>
      <main className={styles.content} id="main-content">
        <Outlet
          context={{
            selectedBrands,
            setSelectedBrands,
            stockCount,
            setStockCount,
            prices,
            setPrices,
          }}
        />
      </main>
    </div>
  );
}

export default Layout;
