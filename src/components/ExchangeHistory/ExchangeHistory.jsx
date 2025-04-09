import axios from "axios";
import React, { useState } from "react";

export default function ExchangeHistory() {
    const [transactions, setTransactions] = useState([]);
    const [startYear, setStartYear] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [endYear, setEndYear] = useState("");
    const [endMonth, setEndMonth] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert input to actual date objects
        const startDate = new Date(`${startYear}-${startMonth}-01`);
        const endDate = new Date(`${endYear}-${endMonth}-01`);

        // Adjust endDate to be the **last day of the month**
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0); // last day of previous month

        try {
            const res = await axios.get("https://stock-x-oyz9.onrender.com/transactions");
            const allData = res.data;

            // Filter by date range
            const filtered = allData.filter((item) => {
                const itemDate = new Date(item.time);
                return itemDate >= startDate && itemDate <= endDate;
            });

            setTransactions(filtered);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    return (
        <div>
            <h2>Filter Transactions by Month and Year</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <h4>Start Date:</h4>
                    <input
                        type="number"
                        placeholder="Start Year"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Start Month (1-12)"
                        value={startMonth}
                        onChange={(e) => setStartMonth(e.target.value)}
                        required
                        min="1"
                        max="12"
                    />
                </div>
                <div>
                    <h4>End Date:</h4>
                    <input
                        type="number"
                        placeholder="End Year"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="End Month (1-12)"
                        value={endMonth}
                        onChange={(e) => setEndMonth(e.target.value)}
                        required
                        min="1"
                        max="12"
                    />
                </div>
                <button type="submit">Show Transactions</button>
            </form>

            <hr />

            <h3>Results</h3>
            {transactions.length === 0 ? (
                <p>No transactions found for this period.</p>
            ) : (
                transactions.map((transaction, index) => {
                    const date = new Date(transaction.time);
                    return (
                        <div key={index}>
                            <p>Buy: {transaction.buy}</p>
                            <p>Sell: {transaction.sell}</p>
                            <p>Due: {transaction.due}</p>
                            <p>Time: {date.toLocaleString()}</p>
                            <hr />
                        </div>
                    );
                })
            )}
        </div>
    );
}
