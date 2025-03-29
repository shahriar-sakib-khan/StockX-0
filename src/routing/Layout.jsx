import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Layout.module.css";
import useLocalStorageState from "./hooks/useLocalStorageState";

function Layout() {
  const [selectedBrands, setSelectedBrands] = useLocalStorageState(
    "selectedBrands",
    []
  );
  const [regulators, setRegulators] = useLocalStorageState("regulators", {});
  const [stoves, setStoves] = useLocalStorageState("stoves", {});
  const [stockCount, setStockCount] = useLocalStorageState("stockCount", {});
  const [prices, setPrices] = useLocalStorageState("prices", {});

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
