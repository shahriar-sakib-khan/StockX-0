import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import allBrands from "../../assets/list_of_brands";
import styles from "./Receipts.module.css";

const Receipts = () => {
  const { prices } = useOutletContext()
  const { state } = useLocation();
  const deliveredItems = state?.deliveredItems || {};
  const receivedItems = state?.receivedItems || {};

  const navigate = useNavigate();

  const renderTableHeader = (isReceived) => {
    return (
      <tr role="row">
        <th role="cell">#</th>
        <th role="cell">Brand</th>
        <th role="cell">Type</th>
        {!isReceived && <th role="cell">Price</th>}
        <th role="cell">Quantity</th>
        {!isReceived && <th role="cell">Total Price</th>}
      </tr>
    );
  }

  const renderTableRows = (items, isReceived) => {
    let finalPrice = 0;
    let serialNumber = 0;

    const rows = Object.entries(items).flatMap(([id, cylinderTypes]) => {
      const brand = allBrands.find((brand) => brand.id === parseInt(id));

      return Object.entries(cylinderTypes).map(([cylinderType, count]) => {
        const price = prices[brand.id]?.[cylinderType] || 0;
        const totalPrice = price * count;
        finalPrice += totalPrice;
        serialNumber++;

        return (
          <tr key={`${id}-${cylinderType}`} role="row">
            <td data-cell="#: " role="cell">{serialNumber}</td>
            <td data-cell="Brand: " role="cell">{brand?.name || "Unknown"}</td>
            <td data-cell="Type: " role="cell" className={`${styles[`type-${cylinderType}`]}`}>{cylinderType}</td>
            {!isReceived && <td data-cell="Price: " role="cell">Tk{price.toFixed(2)}</td>}
            <td data-cell="Quantity: " role="cell">{count}</td>
            {!isReceived && <td data-cell="Total Price: " role="cell">Tk {totalPrice.toFixed(2)}</td>}
          </tr>
        );
      });
    });

    // Add the final total row
    if(!isReceived) rows.push(
      <tr key="final-price" role="row" className={styles.finalPrice}>
        <td role="cell" colSpan="5" style={{ textAlign: "left", borderRight: "none" }}>Final Price:</td>
        <td role="cell">Tk {finalPrice.toFixed(2)}</td>
      </tr>
    );

    return rows;
  };

  return (
    <div className={styles.receiptContainer}>
      { Object.keys(deliveredItems).length > 0 &&
      <div className={styles.delivered}>
        <table className={styles.tableContainer} role="table">
          <caption role="caption">Delivered Items</caption>
          <thead role="rowgroup">{renderTableHeader(false)}</thead>
          <tbody role="rowgroup">{renderTableRows(deliveredItems, false)}</tbody>
        </table>
      </div>
      }
      { Object.keys(receivedItems).length > 0 &&
      <div className={styles.received}>
        <table className={styles.tableContainer} role="table">
          <caption role="caption">Received Items</caption>
          <thead role="rowgroup">{renderTableHeader(true)}</thead>
          <tbody role="rowgroup">{renderTableRows(receivedItems,true)}</tbody>
        </table>
      </div>
      }

      <button className={styles.backBtn} onClick={() => navigate(-1)}>Previous</button>
    </div>
  );
};

export default Receipts;
