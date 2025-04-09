import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import allBrands from "../../assets/Lists/list_of_brands";
import Button from "../Button/Button";
import styles from "./Receipts.module.css";
import {
  getFormattedDateTime,
  updateDeliveredItems,
  updateReceivedItems,
  handleToggleIsDueDelivered,
  handleToggleIsDueReceived,
} from "./receiptUtils";
import useLocalStorageState from "../../routing/hooks/useLocalStorageState";
import { useContext, useEffect, useState } from "react";

// Added by saalifBro
import { UserContext } from "../Login/UserContext";
import axios from "axios";

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
    updateReceivedItems(state?.receivedItems, allBrands)
  );
  const [paid, setPaid] = useLocalStorageState("paid", -1);
  let finalPrice = 0;

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
    setReceivedItems(updateReceivedItems(state?.receivedItems, allBrands));
  }, [setReceivedItems, state?.receivedItems]);

  const navigate = useNavigate();

  const print = () => {
    console.log(deliveredItems);
    console.log(receivedItems);
  };

  const renderTableHeader = (isReceived) => {
    return (
      <tr className={styles.tableHeader} role="row">
        <th className={styles.tableHeaderItem} role="cell">
          #
        </th>
        <th className={styles.tableHeaderItem} role="cell">
          Brand
        </th>
        {/* <th role="cell">Type</th> */}
        {!isReceived && (
          <th className={styles.tableHeaderItem} role="cell">
            Price
          </th>
        )}
        <th className={styles.tableHeaderItem} role="cell">
          Qty
        </th>
        {!isReceived && (
          <th className={styles.tableHeaderItem} role="cell">
            Total Price
          </th>
        )}
        {/* {!isReceived && <th role="cell">Due</th>} */}
      </tr>
    );
  };

  const renderTableRowsDelivered = () => {
    let serial = 1;
    const rows = [];
    // let finalPrice = 0;
    // let paid = 0;

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
            if (!isNaN(totalPrice)) finalPrice += totalPrice;

            if (cylinderType !== "brandName")
              rows.push(
                <tr
                  className={styles.tableBodyRow}
                  key={`${productType}-${id}-${cylinderType}`}
                >
                  <td
                    className={styles.tableBodyRowItem}
                    data-cell="#: "
                    role="cell"
                  >
                    {serial++}
                  </td>
                  <td
                    className={styles.tableBodyRowItem}
                    data-cell="Brand: "
                    role="cell"
                  >
                    {Name || "Unknown"} [{cylinderType}]
                  </td>
                  <td
                    className={styles.tableBodyRowItem}
                    data-cell="Price: "
                    role="cell"
                  >
                    Tk {info.price}
                  </td>
                  <td
                    className={styles.tableBodyRowItem}
                    data-cell="Quantity: "
                    role="cell"
                  >
                    {info.quantity}
                  </td>
                  <td
                    className={styles.tableBodyRowItem}
                    data-cell="Total: "
                    role="cell"
                  >
                    Tk {totalPrice}
                  </td>
                  {/* <td>
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
                  </td> */}
                </tr>
              );
          });
        } else {
          // Handle regulators and stoves (no cylinderType)
          const product = details;
          const totalPrice = product.price * product.quantity;
          finalPrice += totalPrice;
          rows.push(
            <tr className={styles.tableBodyRow} key={`${productType}-${id}`}>
              <td
                className={styles.tableBodyRowItem}
                data-cell="#: "
                role="cell"
              >
                {serial++}
              </td>
              <td
                className={styles.tableBodyRowItem}
                data-cell="Brand: "
                role="cell"
              >
                {Name || "Unknown"}
              </td>
              <td
                className={styles.tableBodyRowItem}
                data-cell="Price: "
                role="cell"
              >
                Tk {product.price}
              </td>
              <td
                className={styles.tableBodyRowItem}
                data-cell="Quantity: "
                role="cell"
              >
                {product.quantity}
              </td>
              <td
                className={styles.tableBodyRowItem}
                data-cell="Total: "
                role="cell"
              >
                Tk {totalPrice}
              </td>
              {/* <td>
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
              </td> */}
            </tr>
          );
        }
      });
    });

    rows.push(
      <tr className={`${styles.tableBodyRow} ${styles.calculation}`} role="row">
        <td className={styles.tableBodyRowItem} role="cell" colSpan="4">
          Total Price
        </td>
        <td className={styles.tableBodyRowItem} role="cell" colSpan="1">
          Tk {finalPrice}
        </td>
      </tr>
    );

    rows.push(
      <tr className={`${styles.tableBodyRow} ${styles.calculation}`} role="row">
        <td className={styles.tableBodyRowItem} role="cell" colSpan="4">
          Paid
        </td>
        <td className={styles.tableBodyRowItem} role="cell" colSpan="1">
          Tk{` `}
          <input
            type="number"
            min="-1"
            placeholder="Enter"
            value={paid === -1 ? "" : paid}
            // max={finalPrice}
            onChange={(e) => {
              setPaid(
                Number(e.target.value)
                // Number(e.target.value) > finalPrice
                //   ? finalPrice
                //   : Number(e.target.value)
              );
            }}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
              if (e.key === "Enter") {
                e.target.blur();
              }
            }}
            className={styles.tableBodyRowItemInput}
          />
        </td>
      </tr>
    );

    const due = finalPrice - (paid === -1 ? 0 : paid);

    rows.push(
      <tr className={`${styles.tableBodyRow} ${styles.calculation}`} role="row">
        <td className={styles.tableBodyRowItem} role="cell" colSpan="4">
          Due
        </td>
        <td className={styles.tableBodyRowItem} role="cell" colSpan="1">
          Tk {due}
        </td>
      </tr>
    );

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
            <tr
              className={styles.tableBodyRow}
              key={`cylinder-${id}-${cylinderType}`}
            >
              <td
                className={styles.tableBodyRowItem}
                data-cell="#: "
                role="cell"
              >
                {serial++}
              </td>
              <td
                className={styles.tableBodyRowItem}
                data-cell="Brand: "
                role="cell"
              >
                {Name || "Unknown"} [{cylinderType}]
              </td>
              <td
                className={styles.tableBodyRowItem}
                data-cell="Quantity: "
                role="cell"
              >
                {info.quantity}
              </td>
              {/* <td>
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
              </td> */}
            </tr>
          );
      });
    });

    return rows;
  };

  const handleNext = () => {
    if (paid === -1) setPaid(0);
    navigate("/exchange-history", {
      state: { deliveredItems, receivedItems, finalPrice, paid },
    });
    // console.log(deliveredItems, receivedItems);
  };

  // Getting the user info
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId"); // Retrieve user ID from storage
      if (userId && !user) {
        // Fetch data only if user is not already set
        try {
          const res = await axios.get(
            `https://stock-x-oyz9.onrender.com/clients/${userId}`
          );
          setUser(res.data);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };
    fetchUserData();
  }, [user, setUser]); // Fetch only if user is missing

  // Getting target shop info
  const [shopId, setShopId] = useState(JSON.parse(localStorage.getItem('selectedShopId')));
  const [shopData, setShopData] = useState(JSON.parse(localStorage.getItem('shopData')));
  const [receiver, setReceiver] = useState({});
  useEffect(() => {
  if (shopData && shopId) {
    const shop = shopData.find((shop) => shop.id === shopId);
    if (shop) setReceiver(shop);
  }
}, [shopData, shopId]);
console.log(receiver);

  const currentShopName = user.shop_name;
  const currentShopOwner = user.username;
  const currentShopContact = user.phone_num;
  const currentShopAddress = user.address;

  const transactionID = receiver.id;
  const targetShopName = receiver.name;
  const targetShopOwner = receiver.ownerName;
  const targetShopContact = receiver.contactNumber;
  const targetShopAddress = receiver.location;

  return (
    <div className={styles.wrapper}>
      <main className={styles.receiptContainer}>
        <div className={styles.buttons}>
          <Button onClick={() => navigate(-1)}>Previous</Button>
          {/* <Button onClick={print}>Console output Lists</Button> */}
          <Button
            onClick={handleNext}
            disabled={paid === -1}
            data-tool-tip="Enter paid amount"
            className={styles.saveBtn}
          >
            Save
          </Button>
        </div>{" "}
        <div className={styles.receipt}>
          <div className={styles.titleSection}>
            {/* current shop details */}
            <div className={styles.currentShopDetails}>
              <h1 className={styles.currentShopName}>{currentShopName}</h1>
              <h2 className={styles.currentShopOwner}>{currentShopOwner}</h2>
              {/* <p className={styles.currentShopMoto}>
                Lorem ipsum dolor sit amet, consectetur adipisicing.
              </p> */}
              <p className={styles.currentShopContact}>
                Phone: {currentShopContact}
              </p>
              <p className={styles.currentShopAddress}>{currentShopAddress}</p>
            </div>
            {/* target shop details */}
            <div className={styles.targetShopDetails}>
              <div className={styles.targetShopTop}>
                <span>Receipt No: {transactionID}</span>
                <span>Date: {getFormattedDateTime()}</span>
              </div>
              <div className={styles.targetShopMiddle}>
                <span>Name: {targetShopName}</span>
                <span>Owner: {targetShopOwner}</span>
              </div>
              <div className={styles.targetShopBottom}>
                <span>Address: {targetShopAddress}</span>
                <span>Phone: {targetShopContact}</span>
              </div>
            </div>
          </div>
          <div className={styles.receiptBody}>
            <div className={styles.delivered}>
              <table className={styles.tableContainer} role="table">
                <caption className={styles.caption} role="caption">
                  Delivered Items
                </caption>
                <thead role="rowgroup">{renderTableHeader(false)}</thead>
                <tbody className={styles.tableBody} role="rowgroup">
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
                <caption className={styles.caption} role="caption">
                  Received Items
                </caption>
                <thead role="rowgroup">{renderTableHeader(true)}</thead>
                <tbody className={styles.tableBody} role="rowgroup">
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
        {/* <div className={styles.bottomSection}>
          <span className={styles.disclaimerText}>
            N.B: Sold products are not refundable.
          </span>
        </div> */}
      </main>
    </div>
  );
}

export default Receipts;
