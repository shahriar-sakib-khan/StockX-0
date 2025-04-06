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
            <div className={styles.form}>
              {/* Read-only input fields */}
              <div className={styles.Input}>
                <label>Shop Name</label>
                <input
                  type="text"
                  name="name"
                  value={shop.name}
                  readOnly
                />
              </div>

              <div className={styles.Input}>
                <label>Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={shop.ownerName}
                  readOnly
                />
              </div>

              <div className={styles.Input}>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={shop.location}
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectShop;
