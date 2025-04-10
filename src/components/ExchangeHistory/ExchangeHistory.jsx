import style from './ExchangeHistory.module.css';
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ExchangeHistory() {
    const [transactions, setTransactions] = useState([]);
    const [startYear, setStartYear] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [endYear, setEndYear] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        fetchTransactions(); // Fetch all by default
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await axios.get("https://stock-x-oyz9.onrender.com/transactions");
            setTransactions(res.data.reverse());
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const handleFilterSubmit = async (e) => {
        e.preventDefault();

        const startDate = new Date(`${startYear}-${startMonth}-01`);
        const endDate = new Date(`${endYear}-${endMonth}-01`);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);

        try {
            const res = await axios.get("https://stock-x-oyz9.onrender.com/transactions");
            const allData = res.data;

            const filtered = allData.filter((item) => {
                const itemDate = new Date(item.time);
                return itemDate >= startDate && itemDate <= endDate;
            });

            setTransactions(filtered.reverse());
            setShowDropdown(false);
        } catch (error) {
            console.error("Error filtering transactions:", error);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.dropdownToggle}>
                <button onClick={() => setShowDropdown(!showDropdown)}>
                    Filter by Date
                </button>
            </div>

            {showDropdown && (
                <form onSubmit={handleFilterSubmit} className={style.dropdownForm}>
                    <h4>Start Date:</h4>
                    <input
                        type="number"
                        placeholder="Year"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        required
                        min="2000"
                    />
                    <input
                        type="number"
                        placeholder="Month (1-12)"
                        value={startMonth}
                        onChange={(e) => setStartMonth(e.target.value)}
                        required
                        min="1"
                        max="12"
                    />
                    <h4>End Date:</h4>
                    <input
                        type="number"
                        placeholder="Year"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                        required
                        min="2000"
                    />
                    <input
                        type="number"
                        placeholder="Month (1-12)"
                        value={endMonth}
                        onChange={(e) => setEndMonth(e.target.value)}
                        required
                        min="1"
                        max="12"
                    />
                    <br /><br />
                    <button type="submit">Apply Filter</button>
                </form>
            )}

<div className={style.output}>
    <h3>All Transactions</h3>
    <hr /><hr />
    {transactions.length === 0 ? (
        <p>No transactions found for this period.</p>
    ) : (
        <div className={style.tableWrapper}>
            <table className={style.transactionTable}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Buy (Tk)</th>
                        <th>Sell (Tk)</th>
                        <th>Due (Tk)</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => {
                        const date = new Date(transaction.time);
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{transaction.buy}</td>
                                <td>{transaction.sell}</td>
                                <td>{transaction.due}</td>
                                <td>{date.toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )}
</div>

        </div>
    );
}
