import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import allBrands from "../../assets/Lists/list_of_brands";
import regulators from "../../assets/Lists/regulator_list";
import stoves from "../../assets/Lists/stove_list";
import Button from "../Button/Button";
import styles from "./Receipts.module.css";

const Receipts = () => {
  const { prices } = useOutletContext()
  const { state } = useLocation();
  const deliveredItems = state?.deliveredItems || {};
  const receivedItems = state?.receivedItems || {};

  const navigate = useNavigate();

  const date = new Date();
  const day = date.getDate().toString().padStart(2, 0);
  const month = (date.getMonth()+1).toString().padStart(2, 0);
  const year = date.getFullYear();
  const hour = (date.getHours() % 12 || 12).toString();
  const meridiem = (date.getHours() >= 12) ? "PM" : "AM";
  const minute = date.getMinutes().toString().padStart(2, 0);

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

    const rows = Object.entries(items).flatMap(([productType, productData]) => {
      return Object.entries(productData).map(([id, itemDetails]) => {
        
        if(productType === "cylinder") {
          const brand = allBrands.find((brand) => brand.id === parseInt(id));
          if (!brand) return [];
          return Object.entries(itemDetails).map(([cylinderType, count]) => {
            serialNumber++;
            const price = prices[productType]?.[brand?.id]?.[cylinderType] || 0;
            const totalPrice = price * count;
            finalPrice += totalPrice;
            
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
        } else {
          const brand = productType === "regulator"
            ? regulators.find((brand) => brand.id === parseInt(id))
            : stoves.find((brand) => brand.id === parseInt(id));
          
          const count = itemDetails;
          const price = prices[productType]?.[brand?.id] || 0;
          const totalPrice = price * count;
          finalPrice += totalPrice;
          serialNumber++;
          
          return (
            <tr key={`${id}-${productType}`} role="row">
              <td data-cell="#: " role="cell">{serialNumber}</td>
              <td data-cell="Brand: " role="cell">{brand?.name || "Unknown"}</td>
              <td data-cell="Type: " role="cell" className={`${styles[`type-${productType}`]}`}>Null</td>
              {!isReceived && <td data-cell="Price: " role="cell">Tk{price.toFixed(2)}</td>}
              <td data-cell="Quantity: " role="cell">{count}</td>
              {!isReceived && <td data-cell="Total Price: " role="cell">Tk {totalPrice.toFixed(2)}</td>}
            </tr>
          );
        }
      });
    });

    if(!isReceived) rows.push(
      <tr key="final-price" role="row" className={styles.finalPrice}>
        <td role="cell" colSpan="5" style={{ textAlign: "left", borderRight: "none" }}>Final Price:</td>
        <td role="cell">Tk {finalPrice.toFixed(2)}</td>
      </tr>
    );

    return rows;
  };

  return (
    <div className={styles.receipt}>
      <div className={styles.buttons}>
        <Button onClick={() => navigate(-1)}>Previous</Button>
        <Button onClick={() => navigate("/exchange-history")}>Print</Button>
      </div>
      <div className={styles.dateContainer}>
        <div className={styles.date}>
          Date: <span>{day}-{month}-{year}</span><br></br>
          Time: <span>{hour}:{minute} {meridiem}</span>
        </div>
      </div>
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
      </div>
    </div>
  );
};

export default Receipts;
