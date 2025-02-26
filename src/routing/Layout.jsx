import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function Layout() {
  const [selectedBrands, setSelectedBrands] = useState(
    JSON.parse(localStorage.getItem("selectedBrands")) || []
  );

  const [stockCount, setStockCount] = useState(() => {
    return JSON.parse(localStorage.getItem("stockCount")) || {};
  });

  useEffect(() => {
    localStorage.setItem("selectedBrands", JSON.stringify(selectedBrands));
  }, [selectedBrands]);
  
  useEffect(() => {
    localStorage.setItem("stockCount", JSON.stringify(stockCount));
  }, [stockCount]);

  return(
    <>
      <Navbar />
      <div id="main">
        <Outlet context={{selectedBrands, setSelectedBrands, stockCount, setStockCount}}/>
      </div>
    </>
  );
}

export default Layout;