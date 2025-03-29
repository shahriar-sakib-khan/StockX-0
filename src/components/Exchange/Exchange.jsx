import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import allBrands from "../../assets/Lists/list_of_brands";
import regulators from "../../assets/Lists/regulator_list";
import stoves from "../../assets/Lists/stove_list";
import Button from "../Button/Button";
import Card from "./Card";
import styles from "./Exchange.module.css";
import useLocalStorageState from "../../routing/hooks/useLocalStorageState";

const Exchange = () => {
  const { selectedBrands, stockCount, setStockCount, prices } =
    useOutletContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeCategory, setActiveCategory] = useState("cylinders");
  const [activeSection, setActiveSection] = useState("delivered");
  const navigate = useNavigate();

  const [deliveredItems, setDeliveredItems] = useLocalStorageState(
    "deliveredItems",
    {}
  );
  const [receivedItems, setReceivedItems] = useLocalStorageState(
    "receivedItems",
    {}
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const updateStock = (id, cylinderType, newStock) => {
  //   setStockCount((prevStocks) => ({
  //     ...prevStocks,
  //     [id]: {
  //       ...(prevStocks[id] || {} ),
  //       [cylinderType]: newStock,
  //     },
  //   }));
  // };

  const updateStock = (id, productType, cylinderType, value) => {
    const newValue = parseFloat(value);

    setStockCount((prev) => ({
      ...prev,
      [productType]: {
        ...(prev[productType] || {}),
        [id]:
          productType === "cylinder"
            ? { ...(prev[productType]?.[id] || {}), [cylinderType]: newValue }
            : newValue,
      },
    }));
  };

  const handleSelectSection = (section) => {
    setActiveSection(section);
  };

  const handleAddItem = (id, productType, cylinderType) => {
    if (!activeSection) return;

    const isCylinder = productType === "cylinder";
    const currentStock = isCylinder
      ? stockCount.cylinder?.[id]?.[cylinderType] || 0
      : stockCount[productType]?.[id] || 0;

    if (activeSection === "delivered") {
      if (currentStock === 0) return;

      setDeliveredItems((prev) => ({
        ...prev,
        [productType]: {
          ...(prev[productType] || {}),
          [id]: isCylinder
            ? {
                ...(prev[productType]?.[id] || {}),
                [cylinderType]:
                  (prev[productType]?.[id]?.[cylinderType] || 0) + 1,
              }
            : (prev[productType]?.[id] || 0) + 1,
        },
      }));

      const newStock = Math.max(currentStock - 1, 0);
      updateStock(id, productType, cylinderType, newStock);
    } else {
      setReceivedItems((prev) => ({
        ...prev,
        [productType]: {
          ...(prev[productType] || {}),
          [id]: isCylinder
            ? {
                ...(prev[productType]?.[id] || {}),
                [cylinderType]:
                  (prev[productType]?.[id]?.[cylinderType] || 0) + 1,
              }
            : (prev[productType]?.[id] || 0) + 1,
        },
      }));
    }
  };

  const handleDecrementItem = (id, productType, cylinderType) => {
    if (!activeSection) return;

    const isCylinder = productType === "cylinder";

    if (activeSection === "delivered") {
      setDeliveredItems((prev) => {
        const updated = JSON.parse(JSON.stringify(prev));

        if (isCylinder) {
          if (updated[productType]?.[id]?.[cylinderType] > 1) {
            updated[productType][id][cylinderType] -= 1;
          } else {
            delete updated[productType][id][cylinderType];

            if (Object.keys(updated[productType][id] || {}).length === 0) {
              delete updated[productType][id];
            }
          }
        } else {
          if (updated[productType]?.[id] > 1) {
            updated[productType][id] -= 1;
          } else {
            delete updated[productType][id];
          }
        }

        const newStock = Math.max(
          (isCylinder
            ? stockCount.cylinder?.[id]?.[cylinderType]
            : stockCount[productType]?.[id]) + 1,
          0
        );

        updateStock(id, productType, cylinderType, newStock);
        return updated;
      });
    } else {
      setReceivedItems((prev) => {
        const updated = JSON.parse(JSON.stringify(prev));

        if (isCylinder) {
          if (updated[productType]?.[id]?.[cylinderType] > 1) {
            updated[productType][id][cylinderType] -= 1;
          } else {
            delete updated[productType][id][cylinderType];

            if (Object.keys(updated[productType]?.[id] || {}).length === 0) {
              delete updated[productType][id];
            }
          }
        } else {
          if (updated[productType]?.[id] > 1) {
            updated[productType][id] -= 1;
          } else {
            delete updated[productType][id];
          }
        }
        return updated;
      });
    }
  };

  const handleRemoveItem = (id, productType, cylinderType) => {
    if (!activeSection) return;

    const isCylinder = productType === "cylinder";

    if (activeSection === "delivered") {
      setDeliveredItems((prev) => {
        const updated = { ...prev };
        let removedCount = 0;

        if (isCylinder) {
          removedCount = updated[productType]?.[id]?.[cylinderType] || 0;
          delete updated[productType]?.[id]?.[cylinderType];
          if (Object.keys(updated[productType]?.[id] || {}).length === 0) {
            delete updated[productType][id];
          }
        } else {
          removedCount = updated[productType]?.[id] || 0;
          delete updated[productType][id];
        }

        setStockCount((prev) => ({
          ...prev,
          [productType]: {
            ...(prev[productType] || {}),
            [id]:
              productType === "cylinder"
                ? {
                    ...(prev[productType]?.[id] || {}),
                    [cylinderType]:
                      (prev[productType]?.[id]?.[cylinderType] || 0) +
                      removedCount,
                  }
                : (prev[productType]?.[id] || 0) + removedCount,
          },
        }));

        return updated;
      });
    } else {
      setReceivedItems((prev) => {
        const updated = { ...prev };

        if (isCylinder) {
          delete updated[productType]?.[id]?.[cylinderType];
          if (Object.keys(updated[productType]?.[id] || {}).length === 0) {
            delete updated[productType][id];
          }
        } else {
          delete updated[productType][id];
        }

        return updated;
      });
    }
  };

  const renderItemList = (items, active) => {
    let serialCounter = 0;
    return (
      <table className={styles.tableContainer} role="table">
        {
          /* Object.keys(items).length > 0 && */
          <thead role="rowgroup">
            <tr role="row">
              <th role="cell">#</th>
              <th role="cell">Brand</th>
              {/* <th role="cell">Type</th> */}
              {/* <th role="cell">Logo</th> */}
              {active !== "received" && <th role="cell">Price</th>}
              <th role="cell">Count</th>
              <th role="cell"></th>
            </tr>
          </thead>
        }
        <tbody role="rowgroup">
          {Object.entries(items).flatMap(([productType, productData]) => {
            return Object.entries(productData).flatMap(([id, typesOrCount]) => {
              if (productType === "cylinder") {
                const brand = allBrands.find(
                  (brand) => brand.id === parseInt(id)
                );
                if (!brand) return [];
                return Object.entries(typesOrCount).map(
                  ([cylinderType, count]) => {
                    serialCounter++;
                    const price =
                      prices[productType]?.[brand?.id]?.[cylinderType] || 0;
                    return (
                      <tr key={`${id}-${cylinderType}`} role="row">
                        <td role="cell" data-cell="#: ">
                          {serialCounter}.
                        </td>
                        <td role="cell" data-cell="Brand: ">
                          {brand?.name || "Unknown"}{" "}
                          <span className={styles[`type-${cylinderType}`]}>
                            {cylinderType}
                          </span>
                        </td>
                        {/* <td role="cell" data-cell="Type: " className={styles[`type-${cylinderType}`]}>{cylinderType}</td> */}
                        {/* <td role="cell" data-cell="Logo: ">
                        {brand && (
                          <img src={brand.logo} alt={brand.name} className={styles.logo} />
                        )}
                      </td > */}
                        {active !== "received" && (
                          <td role="cell" data-cell="Price: ">
                            Tk {price.toFixed(2)}
                          </td>
                        )}
                        <td role="cell" data-cell="Count: ">
                          <span className={styles.Count}>
                            {count}
                            {/* <button
                              className={styles.decrementButton}
                              onClick={() => handleDecrementItem(brand.id, productType, cylinderType)}
                              disabled={activeSection !== active}
                            >-</button> */}
                          </span>
                        </td>
                        <td role="cell" data-cell="Action: ">
                          <div className={styles.actionButtons}>
                            <button
                              className={styles.decrementButton}
                              onClick={() =>
                                handleDecrementItem(
                                  brand.id,
                                  productType,
                                  cylinderType
                                )
                              }
                              disabled={activeSection !== active}
                            >
                              -
                            </button>
                            <button
                              className={`${styles.removeButton} ${
                                windowWidth < 975 ? styles.hidden : ""
                              }`}
                              onClick={() =>
                                handleRemoveItem(
                                  brand.id,
                                  productType,
                                  cylinderType
                                )
                              }
                              disabled={activeSection !== active}
                            >
                              Remove
                            </button>
                            <button
                              className={`${styles.crossButton} ${
                                windowWidth < 975 ? "" : styles.hidden
                              }`}
                              onClick={() =>
                                handleRemoveItem(
                                  brand.id,
                                  productType,
                                  cylinderType
                                )
                              }
                              disabled={activeSection !== active}
                            >
                              ✖
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                );
              } else {
                const brand =
                  productType === "regulator"
                    ? regulators.find((brand) => brand.id === parseInt(id))
                    : stoves.find((brand) => brand.id === parseInt(id));

                const count = typesOrCount;
                serialCounter++;
                const price = prices[productType]?.[brand?.id] || 0;
                return (
                  <tr key={`${id}-${productType}`} role="row">
                    <td role="cell" data-cell="#: ">
                      {serialCounter}.
                    </td>
                    <td role="cell" data-cell="Brand: ">
                      {brand?.name || "Unknown"}
                    </td>
                    {/* <td role="cell" data-cell="Logo: ">
                      {brand && (
                        <img src={brand.logo} alt={brand.name} className={styles.logo} />
                      )}
                    </td > */}
                    {active !== "received" && (
                      <td role="cell" data-cell="Price: ">
                        Tk {price.toFixed(2)}
                      </td>
                    )}
                    <td role="cell" data-cell="Count: ">
                      <span className={styles.Count}>
                        {count}
                        {/* <button
                              className={styles.decrementButton}
                              onClick={() => handleDecrementItem(brand.id, productType)}
                              disabled={activeSection !== active}
                        >-</button> */}
                      </span>
                    </td>
                    <td role="cell" data-cell="Action: ">
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.decrementButton}
                          onClick={() =>
                            handleDecrementItem(brand.id, productType)
                          }
                          disabled={activeSection !== active}
                        >
                          -
                        </button>
                        <button
                          className={`${styles.removeButton} ${
                            windowWidth < 975 ? styles.hidden : ""
                          }`}
                          onClick={() =>
                            handleRemoveItem(brand.id, productType)
                          }
                          disabled={activeSection !== active}
                        >
                          Remove
                        </button>
                        <button
                          className={`${styles.crossButton} ${
                            windowWidth < 975 ? "" : styles.hidden
                          }`}
                          onClick={() =>
                            handleRemoveItem(brand.id, productType)
                          }
                          disabled={activeSection !== active}
                        >
                          ✖
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }
            });
          })}
        </tbody>
      </table>
    );
  };

  const selectedBrandsList = allBrands.filter((brand) =>
    selectedBrands.includes(brand.id)
  );

  const handleNext = (isNextDisabled) => {
    if (!isNextDisabled) {
      navigate("/receipts", {
        state: { deliveredItems, receivedItems },
      });
    }
  };

  const isEmpty = (obj) => {
    return Object.values(obj).every((value) => {
      if (typeof value === "object" && value !== null) {
        return isEmpty(value) || Object.keys(value).length === 0;
      }
      return value === 0;
    });
  };

  const isNextDisabled = isEmpty(deliveredItems) && isEmpty(receivedItems);

  const handleClearLists = () => {
    setDeliveredItems({});
    setReceivedItems({});
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.exchangeContainer}>
        <div className={styles.secondaryNavbar}>
          <ul className={styles.secondaryNavList}>
            {["cylinders", "regulators", "stoves"].map(
              (category) =>
                (activeSection !== "received" || category === "cylinders") && (
                  <li key={category} className={styles.secondaryNavItems}>
                    <Button
                      variant="light"
                      className={`${styles.secondaryNavLink} ${
                        activeCategory === category ? styles.activeBtn : ""
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  </li>
                )
            )}
          </ul>
          <ul className={styles.secondaryNavList}>
            <li className={styles.secondaryNavItems}>
              <Button
                className={styles.nextBtn}
                onClick={() => handleNext(isNextDisabled)}
                disabled={isNextDisabled}
                data-tool-tip={isNextDisabled ? "Add items to proceed" : ""}
              >
                Next
              </Button>
            </li>
          </ul>
        </div>
        <div className={styles.sectionsContainer}>
          {/* Delivered Section */}
          <div
            className={`${styles.section} ${styles.delivered} ${
              activeSection === "delivered" ? styles.active : ""
            } ${
              windowWidth < 890 && activeSection !== "delivered"
                ? styles.hidden
                : ""
            }`}
            onClick={() => handleSelectSection("delivered")}
          >
            <h3 className={styles.sectionTitles}>Delivered</h3>
            <div className={styles.itemList}>
              {renderItemList(deliveredItems, "delivered")}
            </div>
          </div>
          {/* Received Section */}
          <div
            className={`${styles.section} ${styles.received} ${
              activeSection === "received" ? styles.active : ""
            } ${
              windowWidth < 890 && activeSection !== "received"
                ? styles.hidden
                : ""
            }`}
            onClick={() => handleSelectSection("received")}
          >
            <h3 className={styles.sectionTitles}>Received</h3>
            <div className={styles.itemList}>
              {renderItemList(receivedItems, "received")}
            </div>
          </div>
        </div>

        {windowWidth < 890 && (
          <div className={styles.buttonContainer}>
            {/* <Button
            onClick={() => {console.log(deliveredItems); console.log(receivedItems)}}
          >
            print
          </Button> */}
            <Button
              variant="outline"
              className={`${styles.deliveredBtn} ${styles[activeSection]}`}
              onClick={() => {
                handleSelectSection(
                  activeSection === "delivered" ? "received" : "delivered"
                );
                setActiveCategory("cylinders");
              }}
            >
              {activeSection === "delivered"
                ? "Go to Received"
                : "Go to Delivered"}
            </Button>
            {/* <Button
            onClick={handleClearLists}
          >
            Clear Lists
          </Button> */}
          </div>
        )}
        <div className={styles.bottomScrollable}>
          {activeCategory == "cylinders" &&
            [
              ...allBrands.filter((brand) => selectedBrands.includes(brand.id)),
              ...allBrands.filter(
                (brand) => !selectedBrands.includes(brand.id)
              ),
            ].map((brand) =>
              brand.cylinders.map((cylinder) => (
                <Card
                  key={`${brand.id}-${cylinder.type}`}
                  id={brand.id}
                  name={brand.name}
                  type={cylinder.type}
                  cardType={"cylinder"}
                  picture={cylinder.image}
                  price={
                    prices?.cylinder?.[brand.id]?.[cylinder.type] ?? brand.price
                  }
                  stock={
                    selectedBrandsList.includes(brand)
                      ? stockCount?.cylinder?.[brand.id]?.[cylinder.type] ??
                        brand.stock
                      : null
                  }
                  activeSection={activeSection}
                  onAdd={() =>
                    handleAddItem(brand.id, "cylinder", cylinder.type)
                  }
                />
              ))
            )}

          {activeCategory == "regulators" &&
            regulators.map((regulator) => (
              <Card
                key={`regulator-${regulator.id}`}
                id={regulator.id}
                name={regulator.name}
                cardType={"regulator"}
                picture={regulator.image}
                price={prices?.regulator?.[regulator.id] ?? regulator.price}
                stock={stockCount?.regulator?.[regulator.id] ?? regulator.stock}
                activeSection={activeSection}
                onAdd={() => handleAddItem(regulator.id, "regulator")}
              />
            ))}

          {activeCategory == "stoves" &&
            stoves.map((stove) => (
              <Card
                key={`stove-${stove.id}`}
                id={stove.id}
                name={stove.name}
                cardType={"stove"}
                picture={stove.image}
                price={prices?.stove?.[stove.id] ?? stove.price}
                stock={stockCount?.stove?.[stove.id] ?? stove.stock}
                activeSection={activeSection}
                onAdd={() => handleAddItem(stove.id, "stove")}
              />
            ))}
        </div>
      </main>
    </div>
  );
};

export default Exchange;
