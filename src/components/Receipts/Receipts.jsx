import { useLocation, useNavigate } from "react-router-dom";
import allBrands from "../../assets/list_of_brands";
import styles from "./Receipts.module.css";

const Receipts = () => {
  const { state } = useLocation();
  const deliveredItems = state?.deliveredItems || {};
  const receivedItems = state?.receivedItems || {};

  const navigate = useNavigate();

  const renderTableRows = (items) => {
    let finalTotal = 0;

    const rows = Object.entries(items).flatMap(([id, cylinderTypes]) => {
      const brand = allBrands.find((brand) => brand.id === parseInt(id));

      return Object.entries(cylinderTypes).map(([cylinderType, count]) => {
        const price = brand?.price || 0;
        const totalPrice = price * count;
        finalTotal += totalPrice;

        return (
          <tr key={`${id}-${cylinderType}`}>
            <td>{brand?.name || "Unknown"}</td>
            <td className={`${styles[`type-${cylinderType}`]}`}>{cylinderType}</td>
            <td>${price.toFixed(2)}</td>
            <td>{count}</td>
            <td>${totalPrice.toFixed(2)}</td>
          </tr>
        );
      });
    });

    // Add the final total row
    rows.push(
      <tr key="final-total" style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
        <td colSpan="4" style={{ textAlign: "left" }}>Final Total:</td>
        <td>${finalTotal.toFixed(2)}</td>
      </tr>
    );

    return rows;
  };

  return (
    <div className={styles.receiptContainer}>
      <div className={styles.delivered}>
        <h2>Delivered Items</h2>
        <table className={styles.tableContainer}>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Type</th>
              <th>Price</th>
              <th>Count</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>{renderTableRows(deliveredItems)}</tbody>
        </table>
      </div>

      <div className={styles.received}>
        <h2>Received Items</h2>
        <table className={styles.tableContainer}>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Type</th>
              <th>Price</th>
              <th>Count</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>{renderTableRows(receivedItems)}</tbody>
        </table>
      </div>

      <button className={styles.backBtn} onClick={() => navigate(-1)}>Previous</button>
    </div>
  );
};

export default Receipts;
