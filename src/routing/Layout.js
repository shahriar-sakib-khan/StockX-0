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

  const toggleBrand = (id) => {
    setSelectedBrands((prev) =>
      prev.includes(id)
       ? prev.filter(brand => brand.id !== id)
       : [...prev, id]
    )
  }

  return(
    <>
      <Navbar />
      <div id="main">
        <Outlet context={{selectedBrands, toggleBrand}}/>
      </div>
    </>
  );
}

export default Layout;