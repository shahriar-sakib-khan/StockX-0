import React, { useState, useEffect } from "react";
import styles from "./Vehicles.module.css";

import vehicleImage1 from "../../assets/images/Vehicle/vehicle.png"; // Add Vehicle Image
import vehicleImage2 from "../../assets/images/Vehicle/Truck.jpg";   // Default Vehicle Image

const Vehicles = () => {
  const loadInitialVehicleData = () => {
    const savedVehicleData = localStorage.getItem("vehicleData");
    return savedVehicleData ? JSON.parse(savedVehicleData) : [];
  };

  const [vehicleData, setVehicleData] = useState(loadInitialVehicleData);
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    registrationNumber: "",
    ownerName: "",
    contactNumber: "",
    image: "",
  });

  const [addVehicleCardMoved, setAddVehicleCardMoved] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [vehicleToRemove, setVehicleToRemove] = useState(null);

  useEffect(() => {
    localStorage.setItem("vehicleData", JSON.stringify(vehicleData));
  }, [vehicleData]);

  const handleAddVehicle = () => {
    if (editingVehicleId !== null) {
      const updatedList = vehicleData.map((vehicle) =>
        vehicle.id === editingVehicleId ? { ...vehicle, ...newVehicle } : vehicle
      );
      setVehicleData(updatedList);
      setEditingVehicleId(null);
    } else {
      const updatedVehicle = {
        id: Date.now(),
        ...newVehicle,
        image: newVehicle.image || vehicleImage2,
      };
      setVehicleData([...vehicleData, updatedVehicle]);
    }

    setNewVehicle({
      name: "",
      registrationNumber: "",
      ownerName: "",
      contactNumber: "",
      image: "",
    });

    setAddVehicleCardMoved(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewVehicle((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleVehicleInputChange = (e, id) => {
    const { name, value } = e.target;
    setVehicleData((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [name]: value } : v))
    );
  };

  const handleRemoveVehicle = (id) => {
    setVehicleToRemove(vehicleData.find((v) => v.id === id));
    setIsRemovePopupOpen(true);
  };

  const handleConfirmRemove = () => {
    setVehicleData(vehicleData.filter((v) => v.id !== vehicleToRemove.id));
    setIsRemovePopupOpen(false);
    setVehicleToRemove(null);
  };

  const handleCancelRemove = () => {
    setIsRemovePopupOpen(false);
    setVehicleToRemove(null);
  };

  const handleEditClick = (vehicle) => {
    setNewVehicle(vehicle);
    setEditingVehicleId(vehicle.id);
    setIsPopupOpen(true);
  };

  const handleAddCardClick = () => {
    setNewVehicle({
      name: "",
      registrationNumber: "",
      ownerName: "",
      contactNumber: "",
      image: "",
    });
    setIsPopupOpen(true);
    setEditingVehicleId(null);
  };

  return (
    <div className={styles.vehicleContainer}>
      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>{editingVehicleId ? "Edit Vehicle" : "Add New Vehicle"}</h2>
            <div className={styles.inputFields}>
              {["name", "registrationNumber", "ownerName", "contactNumber"].map((field) => (
                <div className={styles.Input} key={field}>
                  <input
                    type="text"
                    name={field}
                    value={newVehicle[field]}
                    onChange={handleInputChange}
                  />
                  <label>{field.replace(/([A-Z])/g, " $1")}</label>
                </div>
              ))}
              <div className={styles.uploadImageInput}>
                <label style={{ marginBottom: "1px" }}>Upload Vehicle Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {newVehicle.image && (
                  <img src={newVehicle.image} alt="Preview" className={styles.imagePreview} />
                )}
              </div>
            </div>
            <div className={styles.popupButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setIsPopupOpen(false);
                  setEditingVehicleId(null);
                }}
              >
                Cancel
              </button>
              <button
                className={styles.addButton}
                onClick={() => {
                  handleAddVehicle();
                  setIsPopupOpen(false);
                }}
              >
                {editingVehicleId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isRemovePopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Are you sure you want to remove this vehicle?</h2>
            <div className={styles.popupButtons}>
              <button className={styles.cancelButton} onClick={handleCancelRemove}>
                No
              </button>
              <button className={styles.addButton} onClick={handleConfirmRemove}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.vehiclesGrid}>
        {vehicleData.map((vehicle) => (
          <div className={styles.vehicleCard} key={vehicle.id}>
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveVehicle(vehicle.id)}
            >
              Remove
            </button>
            <img src={vehicle.image} alt="Vehicle" className={styles.vehicleImage} />
            <div className={styles.details}>
              <p>
                <strong>Name:</strong> {vehicle.name}
              </p>
              <p>
                <strong>Registration No:</strong> {vehicle.registrationNumber}
              </p>
              <p>
                <strong>Owner:</strong> {vehicle.ownerName}
              </p>
              <p>
                <strong>Contact:</strong> {vehicle.contactNumber}
              </p>
            </div>
            <button
              className={styles.editButton}
              onClick={() => handleEditClick(vehicle)}
            >
              Edit
            </button>
          </div>
        ))}

        <div
          className={`${styles.addVehicleCard} ${addVehicleCardMoved ? styles.moveRight : ""}`}
          onClick={handleAddCardClick}
        >
          <img src={vehicleImage1} alt="Add Vehicle" className={styles.addVehicleImage} />
          <div className={styles.addVehicleText}>Add Vehicle</div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
