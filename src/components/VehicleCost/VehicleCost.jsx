import React, { useState, useEffect } from "react";
import styles from './VehicleCost.module.css';

const VehicleCost = () => {
  const loadVehicleData = () => {
    const savedVehicleData = localStorage.getItem('vehicleData');
    return savedVehicleData ? JSON.parse(savedVehicleData) : [];
  };

  const [vehicleData, setVehicleData] = useState(loadVehicleData());
  const [customizePopup, setCustomizePopup] = useState(false);
  const [detailsPopup, setDetailsPopup] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [fuelCost, setFuelCost] = useState('');
  const [maintenanceCost, setMaintenanceCost] = useState('');

  useEffect(() => {
    localStorage.setItem('vehicleData', JSON.stringify(vehicleData));
  }, [vehicleData]);

  const handleCustomize = (id) => {
    setSelectedVehicleId(id);
    setCustomizePopup(true);
    setFuelCost('');
    setMaintenanceCost('');
  };

  const handleDetails = (id) => {
    setSelectedVehicleId(id);
    setDetailsPopup(true);
  };

  const closeCustomizePopup = () => {
    setCustomizePopup(false);
  };

  const closeDetailsPopup = () => {
    setDetailsPopup(false);
  };

  const handleSubmit = () => {
    if (!fuelCost || !maintenanceCost) return;

    const updatedVehicles = vehicleData.map(vehicle => {
      if (vehicle.id === selectedVehicleId) {
        const newHistoryItem = {
          time: new Date().toLocaleString(),
          fuelCost: parseFloat(fuelCost),
          maintenanceCost: parseFloat(maintenanceCost),
        };
        const updatedHistory = vehicle.history ? [...vehicle.history, newHistoryItem] : [newHistoryItem];
        return { ...vehicle, history: updatedHistory };
      }
      return vehicle;
    });

    setVehicleData(updatedVehicles);
    closeCustomizePopup();
  };

  const handleResetHistory = () => {
    const confirmed = window.confirm("Are you sure you want to reset the history?");
    if (!confirmed) return;

    const updatedVehicles = vehicleData.map(vehicle => {
      if (vehicle.id === selectedVehicleId) {
        return { ...vehicle, history: [] };
      }
      return vehicle;
    });

    setVehicleData(updatedVehicles);
  };

  const selectedVehicle = vehicleData.find(v => v.id === selectedVehicleId);

  return (
    <div className={styles.vehicleContainer}>
      <div className={styles.vehiclesGrid}>
        {vehicleData.map((vehicle) => (
          <div className={styles.vehicleCard} key={vehicle.id}>
            <img src={vehicle.image} alt="Vehicle" className={styles.vehicleImage} />
            <div className={styles.details}>
              <p><strong>Vehicle Name:</strong> {vehicle.name}</p>
              <p><strong>Registration No:</strong> {vehicle.registrationNumber}</p>
            </div>
            <div className={styles.cardButtons}>
              <button 
                className={styles.customizeButton} 
                onClick={() => handleCustomize(vehicle.id)}
              >
                Customize
              </button>
              <button 
                className={styles.detailsButton} 
                onClick={() => handleDetails(vehicle.id)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {customizePopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Customize Vehicle</h2>
            

            <label>
              Fuel Cost:
              <input 
                type="number" 
                value={fuelCost}
                onChange={(e) => setFuelCost(e.target.value)} 
                className={styles.inputField}
              />
            </label>

            <label>
              Maintenance Cost:
              <input 
                type="number" 
                value={maintenanceCost}
                onChange={(e) => setMaintenanceCost(e.target.value)} 
                className={styles.inputField}
              />
            </label>

            <div className={styles.popupButtons}>
              <button onClick={handleSubmit} className={styles.submitButton}>
                Submit
              </button>
              <button onClick={closeCustomizePopup} className={styles.closeButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {detailsPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Vehicle Details</h2>
            

            {selectedVehicle?.history?.length ? (
              <table className={styles.historyTable}>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Fuel Cost</th>
                    <th>Maintenance Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {[...selectedVehicle.history].reverse().map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.time}</td>
                      <td>{entry.fuelCost}</td>
                      <td>{entry.maintenanceCost}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td><strong>Total</strong></td>
                    <td>
                      <strong>
                        {selectedVehicle.history.reduce(
                          (sum, entry) => sum + parseFloat(entry.fuelCost || 0), 0
                        )}
                      </strong>
                    </td>
                    <td>
                      <strong>
                        {selectedVehicle.history.reduce(
                          (sum, entry) => sum + parseFloat(entry.maintenanceCost || 0), 0
                        )}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p>No history available.</p>
            )}

            <div className={styles.popupButtons}>
              <button onClick={closeDetailsPopup} className={styles.closeButton}>
                Close
              </button>
              <button onClick={handleResetHistory} className={styles.resetButton}>
                Reset History
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default VehicleCost;
