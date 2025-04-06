import React, { useState, useEffect } from "react";
import styles from "./Shop.module.css";

import shopImage1 from "../../assets/images/Shop/shop.png";
import shopImage2 from "../../assets/images/Shop/CylinderShop.jpg";

const Shop = () => {
  const loadInitialShopData = () => {
    const savedShopData = localStorage.getItem("shopData");
    return savedShopData ? JSON.parse(savedShopData) : [];
  };

  const [shopData, setShopData] = useState(loadInitialShopData);
  const [newShop, setNewShop] = useState({
    name: "",
    registrationNumber: "",
    ownerName: "",
    contactNumber: "",
    location: "",
    balance: 0,
    image: "",
  });

  const [addShopCardMoved, setAddShopCardMoved] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingShopId, setEditingShopId] = useState(null);

  useEffect(() => {
    localStorage.setItem("shopData", JSON.stringify(shopData));
  }, [shopData]);

  const handleAddShop = () => {
    if (editingShopId !== null) {
      const updatedShopList = shopData.map((shop) =>
        shop.id === editingShopId ? { ...shop, ...newShop } : shop
      );
      setShopData(updatedShopList);
      setEditingShopId(null);
    } else {
      const updatedShopData = {
        id: Date.now(),
        ...newShop,
        image: newShop.image || shopImage2,
      };
      const updatedShopList = [...shopData, updatedShopData];
      setShopData(updatedShopList);
    }

    setNewShop({
      name: "",
      registrationNumber: "",
      ownerName: "",
      contactNumber: "",
      location: "",
      balance: 0,
      image: "",
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewShop((prevShop) => ({
        ...prevShop,
        image: imageUrl,
      }));
    }
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

  const handleEditClick = (shop) => {
    setNewShop(shop);
    setEditingShopId(shop.id);
    setIsPopupOpen(true);
  };

  // Function to open the Add Shop popup
  const handleAddShopCardClick = () => {
    setNewShop({
      name: "",
      registrationNumber: "",
      ownerName: "",
      contactNumber: "",
      location: "",
      balance: 0,
      image: "",
    }); // Reset to empty values for a new shop
    setIsPopupOpen(true); // Open the popup
    setEditingShopId(null); // No editing, so set to null
  };

  // Handle Balance Focus and Blur
  const handleBalanceFocus = (e) => {
    if (e.target.value === "0") {
      e.target.value = "";
    }
  };

  const handleBalanceBlur = (e) => {
    if (e.target.value === "") {
      e.target.value = "0";
    }
  };

  return (
    <div className={styles.shopContainer}>
      {/* Popup Modal */}
      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>{editingShopId ? "Edit Shop" : "Add New Shop"}</h2>
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
                  onFocus={handleBalanceFocus}
                  onBlur={handleBalanceBlur}
                />
                <label>Balance</label>
              </div>

              {/* Image Upload Field */}
              <div className={styles.uploadImageInput}>
                <label style={{ marginBottom: "1px" }}>Upload Shop Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {newShop.image && (
                  <img
                    src={newShop.image}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                )}
              </div>
            </div>
            <div className={styles.popupButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setIsPopupOpen(false);
                  setEditingShopId(null);
                }}
              >
                Cancel
              </button>
              <button
                className={styles.addButton}
                onClick={() => {
                  handleAddShop();
                  setIsPopupOpen(false);
                }}
              >
                {editingShopId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Shop Cards */}
      <div className={styles.shopsGrid}>
        {shopData.map((shop) => (
          <div className={styles.shopCard} key={shop.id}>
            <div className={styles.balance}>Balance: {shop.balance}</div>

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
                  disabled
                />
                <label>Shop Name</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="registrationNumber"
                  value={shop.registrationNumber}
                  onChange={(e) => handleShopInputChange(e, shop.id)}
                  disabled
                />
                <label>Registration No.</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="ownerName"
                  value={shop.ownerName}
                  onChange={(e) => handleShopInputChange(e, shop.id)}
                  disabled
                />
                <label>Owner Name</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="contactNumber"
                  value={shop.contactNumber}
                  onChange={(e) => handleShopInputChange(e, shop.id)}
                  disabled
                />
                <label>Contact Number</label>
              </div>
              <div className={styles.Input}>
                <input
                  type="text"
                  name="location"
                  value={shop.location}
                  onChange={(e) => handleShopInputChange(e, shop.id)}
                  disabled
                />
                <label>Location</label>
              </div>
            </div>
            <button
              className={styles.editButton}
              onClick={() => handleEditClick(shop)}
            >
              Edit
            </button>
          </div>
        ))}

        {/* Add Shop Card */}
        <div
          className={`${styles.addShopCard} ${
            addShopCardMoved ? styles.moveRight : ""
          }`}
          onClick={handleAddShopCardClick}
        >
          <img
            src={shopImage1}
            alt="Add Shop"
            className={styles.addShopImage}
          />
          <div className={styles.addShopText}>Add Shop</div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
