import React, { useState, useEffect } from "react";
import styles from './VehicleCost.module.css';  // Import your CSS file for styling

const VehicleCost = () => {
  // Load vehicle data from local storage
  const loadVehicleData = () => {
    const savedVehicleData = localStorage.getItem('vehicleData');
    return savedVehicleData ? JSON.parse(savedVehicleData) : [];
  };

  const [vehicleData, setVehicleData] = useState(loadVehicleData());

  return (
    <div className={styles.vehicleContainer}>
      {/* Render vehicle details */}
      <div className={styles.vehiclesGrid}>
        {vehicleData.map((vehicle) => (
          <div className={styles.vehicleCard} key={vehicle.id}>
            <img src={vehicle.image} alt="Vehicle" className={styles.vehicleImage} />
            <div className={styles.details}>
              <p><strong>Vehicle Name:</strong> {vehicle.name}</p>
              <p><strong>Registration No:</strong> {vehicle.registrationNumber}</p>
              <p><strong>Owner Name:</strong> {vehicle.ownerName}</p>
              <p><strong>Contact Number:</strong> {vehicle.contactNumber}</p>
              <p><strong>Cost:</strong> {vehicle.cost || "Not Available"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleCost;
