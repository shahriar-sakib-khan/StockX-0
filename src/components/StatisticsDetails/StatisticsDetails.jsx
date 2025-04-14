import { useLocation, useNavigate } from "react-router-dom";
import styles from "./StatisticsDetails.module.css";

const StatisticsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    fuelCost,
    maintenanceCost,
    totalBuyCost,
    totalSellCost,
    totalCost,
    vehicleData,
    transactionData
  } = location.state || {};

  if (!location.state) {
    return <p>No data available.</p>;
  }

  return (
    <div className={styles.container}>
      
      <button 
        className={styles.goBackButton}
        onClick={() => navigate(-1)}
      >
         Go Back
      </button>

      <h2 className={styles.heading}>Analytics Overview</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Fuel Cost</td><td>{fuelCost}</td></tr>
          <tr><td>Maintenance Cost</td><td>{maintenanceCost}</td></tr>
          <tr><td>Total Buy Cost</td><td>{totalBuyCost}</td></tr>
          <tr><td>Total Sell Cost</td><td>{totalSellCost}</td></tr>
          <tr><td>Total Cost (Fuel + Maintenance + Buy)</td><td>{totalCost}</td></tr>
        </tbody>
      </table>

      <h3 className={styles.subHeading}> Vehicle Cost Details</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Vehicle Name</th>
            <th>Time</th>
            <th>Fuel Cost</th>
            <th>Maintenance Cost</th>
          </tr>
        </thead>
        <tbody>
          {vehicleData?.map((vehicle, i) => (
            vehicle.history?.map((entry, j) => (
              <tr key={`${i}-${j}`}>
                <td>{vehicle.name || `Vehicle ${i + 1}`}</td>
                <td>{entry.time || 'N/A'}</td>
                <td>{entry.fuelCost}</td>
                <td>{entry.maintenanceCost}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>

      <h3 className={styles.subHeading}> Buy & Sell Transactions</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Buy Cost</th>
            <th>Sell Cost</th>
          </tr>
        </thead>
        <tbody>
          {transactionData?.map((t, i) => (
            <tr key={i}>
              <td>{t.product || `Item ${i + 1}`}</td>
              <td>{t.buy}</td>
              <td>{t.sell}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsDetails;
