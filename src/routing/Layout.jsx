import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

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

  // const isSpecialPage = (location.pathname === "/") || (location.pathname === "/register") || (location.pathname === "/recovery");

  return(
    <>
      <Navbar />
      <main id="main">
        <Outlet context={{selectedBrands, setSelectedBrands, stockCount, setStockCount, prices, setPrices}}/>
      </main>
    </>
  );
}

export default Layout;