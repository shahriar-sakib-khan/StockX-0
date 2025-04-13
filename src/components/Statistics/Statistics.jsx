import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";
import { useNavigate } from "react-router-dom";
import styles from './Statistics.module.css';

const Statistics = () => {
  const navigate = useNavigate();

  const loadVehicleData = () => {
    const savedVehicleData = localStorage.getItem('vehicleData');
    return savedVehicleData ? JSON.parse(savedVehicleData) : [];
  };

  const loadTransactionData = () => {
    const savedTransactionData = localStorage.getItem('transactionsData');
    return savedTransactionData ? JSON.parse(savedTransactionData) : [];
  };

  const [vehicleData, setVehicleData] = useState(loadVehicleData());
  const [transactionData, setTransactionData] = useState(loadTransactionData());
  const [fuelCost, setFuelCost] = useState(0);
  const [maintenanceCost, setMaintenanceCost] = useState(0);
  const [totalBuyCost, setTotalBuyCost] = useState(0);
  const [totalSellCost, setTotalSellCost] = useState(0);

  useEffect(() => {
    let fuelSum = 0;
    let maintenanceSum = 0;
    let buySum = 0;
    let sellSum = 0;

    vehicleData.forEach(vehicle => {
      vehicle.history?.forEach(entry => {
        fuelSum += entry.fuelCost || 0;
        maintenanceSum += entry.maintenanceCost || 0;
      });
    });

    transactionData.forEach(transaction => {
      const buyValue = parseFloat(transaction.buy) || 0;
      const sellValue = parseFloat(transaction.sell) || 0;

      buySum += buyValue;
      sellSum += sellValue;
    });

    setFuelCost(fuelSum);
    setMaintenanceCost(maintenanceSum);
    setTotalBuyCost(buySum);
    setTotalSellCost(sellSum);
  }, [vehicleData, transactionData]);

  const totalCost = fuelCost + maintenanceCost + totalBuyCost;

  const barChartData = [
    { name: "Total Cost", cost: totalCost, fill: "#32CD32" },
    { name: "Total Sell", cost: totalSellCost, fill: "#ff9800" }
  ];

  const pieChartData = [
    { name: "Fuel", cost: fuelCost, fill: "#4caf50" },
    { name: "Maintenance", cost: maintenanceCost, fill: "#81c784" },
    { name: "Buy", cost: totalBuyCost, fill: "#2196f3" },
    { name: "Sell", cost: totalSellCost, fill: "#ff9800" }
  ];

  const handleChartClick = (data) => {
    if (data && data.name && data.cost !== undefined) {
      navigate("/statistics-details", {
        state: {
          fuelCost,
          maintenanceCost,
          totalBuyCost,
          totalSellCost,
          totalCost
        }
      });
    }
  };

  return (
    <div className={styles.statisticsContainer}>
      <h2 className={styles.header}>Total Costs & Transactions</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={barChartData} barSize={100} onClick={({ activePayload }) => handleChartClick(activePayload?.[0]?.payload)}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(218, 218, 218)" />
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip contentStyle={{ backgroundColor: 'rgb(132, 132, 132)', borderRadius: '5px', color: '#fff' }} />
          <Legend wrapperStyle={{ fontSize: '14px', marginTop: '10px' }} />
          <Bar dataKey="cost">
            {barChartData.map((entry, index) => (
              <Cell key={`bar-cell-${index}`} fill={entry.fill} radius={[10, 10, 0, 0]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={{ marginTop: "30px", width: "100%", height: "300px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={pieChartData}
              dataKey="cost"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              onClick={(data) => handleChartClick(data)} // Same for pie chart click
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`pie-cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
