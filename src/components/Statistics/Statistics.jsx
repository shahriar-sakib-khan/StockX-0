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
    { name: "Total Cost", cost: totalCost, fill: "#F4A261" },
    { name: "Total Sell", cost: totalSellCost, fill: "#3A86FF" }
  ];

  const pieChartData = [
    { name: "Fuel", cost: fuelCost, fill: "#2A9D8F" },
    { name: "Maintenance", cost: maintenanceCost, fill: "#264653" },
    { name: "Buy", cost: totalBuyCost, fill: "#E63946" },
    { name: "Sell", cost: totalSellCost, fill: "#E76F51" }
  ];

  const handleChartClick = (data) => {
    if (data && data.name && data.cost !== undefined) {
      navigate("/statistics-details", {
        state: {
          fuelCost,
          maintenanceCost,
          totalBuyCost,
          totalSellCost,
          totalCost,
          vehicleData,
          transactionData
        }
      });
    }
  };

  // Custom Tooltip for Bar Chart
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'rgb(132, 132, 132)',
          borderRadius: '5px',
          padding: '8px',
          color: '#fff',
          fontSize: '16px'
        }}>
          {payload[0].value}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.statisticsContainer}>
      <h2 className={styles.header}>Total Costs & Transactions</h2>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ResponsiveContainer width="80%" height={400}>
          <BarChart
            data={barChartData}
            barSize={100}
            onClick={({ activePayload }) => handleChartClick(activePayload?.[0]?.payload)}
            style={{ cursor: 'default' }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(218, 218, 218)" />
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip content={<CustomBarTooltip />} />
            <Legend wrapperStyle={{ fontSize: '14px', marginTop: '10px' }} />
            <Bar dataKey="cost">
              {barChartData.map((entry, index) => (
                <Cell key={`bar-cell-${index}`} fill={entry.fill} radius={[0, 0, 0, 0]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart Color Indicators */}
      <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
        {barChartData.map((entry, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "24px"
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                backgroundColor: entry.fill,
                borderRadius: "50%",
                marginRight: 8
              }}
            />
            <span style={{ fontSize: "18px", color: "#333" }}>{entry.name}</span>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div style={{ marginTop: "30px", width: "100%", height: "360px" }}>
        <h3 className={styles.chartHeader}>Financial Summary</h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <ResponsiveContainer width="50%" height="100%">
            <PieChart>
              <Tooltip />
              <Pie
                data={pieChartData}
                dataKey="cost"
                nameKey="name"
                cx="60%"
                cy="50%"
                outerRadius={100}
                label
                onClick={(data) => handleChartClick(data)}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`pie-cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div style={{ marginLeft: "40px" }}>
            {pieChartData.map((entry, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    backgroundColor: entry.fill,
                    borderRadius: "50%",
                    marginRight: 8,
                  }}
                />
                <span style={{ fontSize: "20px", color: "#333" }}>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
