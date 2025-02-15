import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function Layout() {
  const [selectedBrands, setSelectedBrands] = useState(
    JSON.parse(localStorage.getItem("selectedBrands")) || []
  );

  useEffect(() => {
    localStorage.setItem("selectedBrands", JSON.stringify(selectedBrands));
  }, [selectedBrands]);

  return(
    <>
      <Navbar />
      <div id="main">
        <Outlet context={{selectedBrands, setSelectedBrands}}/>
      </div>
    </>
  );
}

export default Layout;