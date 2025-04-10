import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './ShopSelection.module.css';  // Reuse the same CSS file

const SelectShop = () => {
  const navigate = useNavigate();

  // Load shop data from local storage (same as in Shop.js)
  const loadShopData = () => {
    const savedShopData = localStorage.getItem('shopData');
    return savedShopData ? JSON.parse(savedShopData) : [];
  };

  const [shopData, setShopData] = useState(loadShopData());
  const [selectedShopId, setSelectedShopId] = useState(null);

  const handleSelectShop = (shopId, shopName) => {
    setSelectedShopId(shopId);  // Set selected shop ID

    // Store only the selected shop name in local storage
    localStorage.setItem('selectedShop', shopName);
    localStorage.setItem('selectedShopId', shopId);

    // Navigate to the Exchange page after selecting a shop
    navigate("/exchange");
  };

  return (
    <div className={styles.shopContainer}>
      {/* Render shop cards */}
      <div className={styles.shopsGrid}>
        {shopData.map((shop) => (
          <div
            className={`${styles.shopCard} ${selectedShopId === shop.id ? styles.selected : ''}`} // Corrected className
            key={shop.id}
            onClick={() => handleSelectShop(shop.id, shop.name)} // Pass the shop name only
          >
            <img src={shop.image} alt="Shop" className={styles.shopImage} />
            <div className={styles.simpleInfo}>
              {/* Display shop details without labels or input fields */}
              <p>{shop.name}</p>
              <p>{shop.ownerName}</p>
              <p>{shop.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectShop;
