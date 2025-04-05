import React, { useState, useEffect } from "react";
import styles from './Shop.module.css';

import shopImage1 from '../../assets/images/Shop/shop.png';
import shopImage2 from '../../assets/images/Shop/CylinderShop.jpg';

const Shop = () => {
  const loadInitialShopData = () => {
    const savedShopData = localStorage.getItem('shopData');
    return savedShopData ? JSON.parse(savedShopData) : [];
  };

  const [shopData, setShopData] = useState(loadInitialShopData);
  const [newShop, setNewShop] = useState({
    name: '',
    registrationNumber: '',
    ownerName: '',
    contactNumber: '',
    location: '',
    balance: '',
    image: shopImage2,
  });

  const [addShopCardMoved, setAddShopCardMoved] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('shopData', JSON.stringify(shopData));
  }, [shopData]);

  const handleAddShop = () => {
    const updatedShopData = {
      id: Date.now(),
      ...newShop,
    };
    const updatedShopList = [...shopData, updatedShopData];
    setShopData(updatedShopList);

    setNewShop({
      name: '',
      registrationNumber: '',
      ownerName: '',
      contactNumber: '',
      location: '',
      balance: '',
      image: shopImage2,
    });

    setAddShopCardMoved(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShop((prevShop) => ({
      ...prevShop,
      [name]: value,
    }));
  };

  const handleShopInputChange = (e, shopId) => {
    const { name, value } = e.target;
    setShopData((prevData) =>
      prevData.map((shop) =>
        shop.id === shopId ? { ...shop, [name]: value } : shop
      )
    );
  };

  const handleRemoveShop = (shopId) => {
    const updatedShopList = shopData.filter((shop) => shop.id !== shopId);
    setShopData(updatedShopList);
  };

  return (
    <div className={styles.shopContainer}>
      {/* Popup Modal */}
      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Add New Shop</h2>
            <div className={styles.inputFields}>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="name"
                  value={newShop.name}
                  onChange={handleInputChange}
                />
                <label>Shop Name</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="registrationNumber"
                  value={newShop.registrationNumber}
                  onChange={handleInputChange}
                />
                <label>Registration No.</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="ownerName"
                  value={newShop.ownerName}
                  onChange={handleInputChange}
                />
                <label>Owner Name</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="contactNumber"
                  value={newShop.contactNumber}
                  onChange={handleInputChange}
                />
                <label>Contact Number</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="location"
                  value={newShop.location}
                  onChange={handleInputChange}
                />
                <label>Location</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="number"
                  name="balance"
                  value={newShop.balance}
                  onChange={handleInputChange}
                />
                <label>Balance</label>
              </div>
            </div>
            <div className={styles.popupButtons}>
              <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
              <button onClick={() => {
                handleAddShop();
                setIsPopupOpen(false);
              }}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Render Shop Cards */}
      <div className={styles.shopsGrid}>
        {shopData.map((shop) => (
          <div className={styles.shopCard} key={shop.id}>
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveShop(shop.id)}
            >
              Remove
            </button>
            <img src={shop.image} alt="Shop" className={styles.shopImage} />
            <div className={styles.inputFields}>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="name"
                  value={shop.name}
                  onChange={(e) => handleShopInputChange(e, shop.id)}
                />
                <label>Shop Name</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="registrationNumber"
                  value={shop.registrationNumber}
                  onChange={(e) => handleShopInputChange(e, shop.id)}
                />
                <label>Registration No.</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="ownerName"
                  value={shop.ownerName}
                  onChange={(e) => handleShopInputChange(e, shop.id)}
                />
                <label>Owner Name</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="contactNumber"
                  value={shop.contactNumber}
                  onChange={(e) => handleShopInputChange(e, shop.id)}
                />
                <label>Contact Number</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="location"
                  value={shop.location}
                  onChange={(e) => handleShopInputChange(e, shop.id)}
                />
                <label>Location</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="number"
                  name="balance"
                  value={shop.balance}
                  onChange={(e) => handleShopInputChange(e, shop.id)}
                />
                <label>Balance</label>
              </div>
            </div>
          </div>
        ))}

        {/* Add Shop Card */}
        <div
  className={`${styles.addShopCard} ${addShopCardMoved ? styles.moveRight : ""}`}
  onClick={() => setIsPopupOpen(true)}
>

          <img src={shopImage1} alt="Add Shop" className={styles.addShopImage} />
          <div className={styles.addShopText}>Add Shop</div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 