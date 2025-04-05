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
    return Object.entries(deliveredItems).map(([productType, items]) =>
      Object.entries(items).map(([id, details]) => {
        if (productType === "cylinder") {
          const brand = selectedBrands.find((brand) => brand.id == id);
          // Cylinder case (has cylinderType)
          return Object.entries(details).map(([cylinderType, info]) => {
            const price = brand.cylinders.find(
              (cylinder) => cylinder.type === cylinderType
            ).price;
            return (
              <tr key={`${productType}-${id}-${cylinderType}`}>
                <td>{serial++}</td>
                <td>
                  {brand?.name || "Unknown"}{" "}
                  <span className={styles[`type-${cylinderType}`]}>
                    {cylinderType}
                  </span>{" "}
                </td>
                <td>{price}</td>
                {/*....................................................................... */}
                <td>{info.quantity}</td>
                <td>total price</td>
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
          // Regulator & Stove case (no cylinderType)
          const list = productType === "regulator" ? regulators : stoves;
          const brand = list.find((brand) => brand.id == id);

          return (
            <tr key={`${productType}-${id}`}>
              <td>{serial++}</td>
              <td>{brand.name}</td>
              <td>price</td>
              <td>{details.quantity}</td>
              <td>total price</td>
              <td>
                <input
                  type="checkbox"
                  checked={details.isDue}
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
      })
    );
  };

  const renderTableRowsReceived = () => {
    let serial = 1;
    return Object.entries(receivedItems).map(([id, cylinderTypes]) => {
      const brand = selectedBrands.find((brand) => brand.id == id);
      return Object.entries(cylinderTypes).map(([cylinderType, details]) => (
        <tr key={`${id}-${cylinderType}`}>
          <td>{serial++}</td>
          <span>{brand.name}</span> <span>{cylinderType}</span>
          <td>{details.quantity}</td>
          <td>
            <input
              type="checkbox"
              checked={details.isDue}
              onChange={() =>
                handleToggleIsDueReceived(id, cylinderType, setReceivedItems)
              }
            />
          </td>
        </tr>
      ));
    });
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
