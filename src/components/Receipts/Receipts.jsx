import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Receipts.module.css";
import {
  getFormattedDateTime,
  updateDeliveredItems,
  updateReceivedItems,
  handleToggleIsDueDelivered,
  handleToggleIsDueReceived,
} from "./receiptUtils";
import { useEffect, useState } from "react";
import useLocalStorageState from "../../routing/hooks/useLocalStorageState";

function Receipts() {
  const { selectedBrands, regulators, stoves } = useOutletContext();
  const { state } = useLocation();
  const [deliveredItems, setDeliveredItems] = useLocalStorageState(
    "newDelivered",
    updateDeliveredItems(
      state?.deliveredItems,
      selectedBrands,
      regulators,
      stoves
    )
  );
  const [receivedItems, setReceivedItems] = useLocalStorageState(
    "newReceived",
    updateReceivedItems(state?.receivedItems, selectedBrands)
  );

  useEffect(() => {
    setDeliveredItems(
      updateDeliveredItems(
        state?.deliveredItems,
        selectedBrands,
        regulators,
        stoves
      )
    );
  }, [
    setDeliveredItems,
    state?.deliveredItems,
    selectedBrands,
    regulators,
    stoves,
  ]);

  useEffect(() => {
    setReceivedItems(updateReceivedItems(state?.receivedItems, selectedBrands));
  }, [setReceivedItems, state?.receivedItems, selectedBrands]);

  const navigate = useNavigate();

  const print = () => {
    console.log(deliveredItems);
    console.log(receivedItems);
  };

  const renderTableHeader = (isReceived) => {
    return (
      <tr role="row">
        <th role="cell">#</th>
        <th role="cell">Brand</th>
        {/* <th role="cell">Type</th> */}
        {!isReceived && <th role="cell">Price</th>}
        <th role="cell">Quantity</th>
        {!isReceived && <th role="cell">Total Price</th>}
        {!isReceived && <th role="cell">Due</th>}
      </tr>
    );
  };

  const renderTableRowsDelivered = () => {
    let serial = 1;
    const rows = [];

    // Iterate over the types of products (cylinder, regulator, stove)
    Object.keys(deliveredItems).forEach((productType) => {
      const items = deliveredItems[productType];

      // Iterate over each item (brandId) within the current productType
      Object.keys(items).forEach((id) => {
        const details = items[id];
        const Name =
          productType === "cylinder" ? details.brandName : details.productName;

        if (productType === "cylinder") {
          // Handle cylinders (which include cylinderType)
          Object.keys(details).forEach((cylinderType) => {
            const info = details[cylinderType];
            const totalPrice = info.price * info.quantity;

            if (cylinderType !== "brandName")
              rows.push(
                <tr key={`${productType}-${id}-${cylinderType}`}>
                  <td>{serial++}</td>
                  <td>
                    {Name || "Unknown"} ({cylinderType})
                  </td>
                  <td>{info.price}</td>
                  <td>{info.quantity}</td>
                  <td>{totalPrice}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={info.isDue}
                      onChange={() =>
                        handleToggleIsDueDelivered(
                          productType,
                          id,
                          cylinderType,
                          setDeliveredItems
                        )
                      }
                    />
                  </td>
                </tr>
              );
          });
        } else {
          // Handle regulators and stoves (no cylinderType)
          const product = details;
          const totalPrice = product.price * product.quantity;

          rows.push(
            <tr key={`${productType}-${id}`}>
              <td>{serial++}</td>
              <td>{Name || "Unknown"}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{totalPrice}</td>
              <td>
                <input
                  type="checkbox"
                  checked={product.isDue}
                  onChange={() =>
                    handleToggleIsDueDelivered(
                      productType,
                      id,
                      null,
                      setDeliveredItems
                    )
                  }
                />
              </td>
            </tr>
          );
        }
      });
    });

    return rows;
  };

  const renderTableRowsReceived = () => {
    let serial = 1;
    const rows = [];

    // Iterate over each brand in receivedItems
    Object.keys(receivedItems).forEach((id) => {
      const details = receivedItems[id];
      const Name = details.brandName;

      // Iterate over each cylinderType for the current brand
      Object.keys(details).forEach((cylinderType) => {
        const info = details[cylinderType];

        // Push the row into the rows array
        if (cylinderType !== "brandName")
          rows.push(
            <tr key={`${id}-${cylinderType}`}>
              <td>{serial++}</td>
              <td>
                {Name || "Unknown"} ({cylinderType})
              </td>
              <td>{info.quantity}</td>
              <td>
                <input
                  type="checkbox"
                  checked={info.isDue}
                  onChange={() =>
                    handleToggleIsDueReceived(
                      id,
                      cylinderType,
                      setReceivedItems
                    )
                  }
                />
              </td>
            </tr>
          );
      });
    });

    return rows;
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.receiptContainer}>
        <div className={styles.buttons}>
          <Button onClick={() => navigate(-1)}>Previous</Button>
          <Button onClick={print}>Print</Button>
          <Button onClick={() => navigate("/exchange-history")}>Save</Button>
        </div>{" "}
        <div className={styles.receipt}>
          <div className={styles.titleSection}>
            <h1 className={styles.heading}>Receipt</h1>
          </div>
          <div className={styles.receiptBody}>
            <div className={styles.delivered}>
              <table className={styles.tableContainer} role="table">
                <caption role="caption">Delivered Items</caption>
                <thead role="rowgroup">{renderTableHeader(false)}</thead>
                <tbody role="rowgroup">
                  {/* <tr>
                    <td>1</td>
                    <td>Company</td>
                    <td>400</td>
                    <td>5</td>
                    <td>2000</td>
                    <td>O</td>
                  </tr> */}
                  {/* {renderTableRows(deliveredItems, false)} */}
                  {renderTableRowsDelivered()}
                </tbody>
              </table>
            </div>
            <div className={styles.received}>
              <table className={styles.tableContainer} role="table">
                <caption role="caption">Received Items</caption>
                <thead role="rowgroup">{renderTableHeader(true)}</thead>
                <tbody role="rowgroup">
                  {/* {renderTableRows(receivedItems, true)} */}
                  {/* <tr>
                    <td>1</td>
                    <td>Company</td>
                    <td>5</td>
                  </tr> */}
                  {renderTableRowsReceived()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Receipts;
