import { useLocation } from "react-router-dom";

const StatisticsDetails = () => {
  const location = useLocation();
  const { fuelCost, maintenanceCost, totalBuyCost, totalSellCost, totalCost } = location.state || {};

  if (!location.state) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <h2>Statistics Details</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fuel Cost</td>
            <td>{fuelCost}</td>
          </tr>
          <tr>
            <td>Maintenance Cost</td>
            <td>{maintenanceCost}</td>
          </tr>
          <tr>
            <td>Total Buy Cost</td>
            <td>{totalBuyCost}</td>
          </tr>
          <tr>
            <td>Total Sell Cost</td>
            <td>{totalSellCost}</td>
          </tr>
          <tr>
            <td>Total Cost (Fuel + Maintenance + Buy)</td>
            <td>{totalCost}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsDetails;
