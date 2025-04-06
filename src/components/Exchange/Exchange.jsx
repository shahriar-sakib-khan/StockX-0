import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useUpdateStock } from "../../routing/hooks/useUpdateStock";
import allBrands from "../../assets/Lists/list_of_brands";
import useLocalStorageState from "../../routing/hooks/useLocalStorageState";
import Button from "../Button/Button";
import Card from "./Card";
import styles from "./Exchange.module.css";

const Exchange = () => {
  const {
    selectedBrands,
    setSelectedBrands,
    regulators,
    setRegulators,
    stoves,
    setStoves,
  } = useOutletContext();
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

  const updateStock = useUpdateStock(
    setSelectedBrands,
    setRegulators,
    setStoves
  );

  const handleSelectSection = (section) => {
    setActiveSection(section);
  };

  const getCurrentStock = (id, productType, cylinderType) => {
    let currentStock = 0;
    if (productType === "cylinder") {
      const brand = selectedBrands.find((brand) => brand.id === id);
      const cylinder = brand?.cylinders.find(
        (cylinder) => cylinder.type === cylinderType
      );
      currentStock = cylinder?.stock || 0;
    } else {
      const productList =
        productType === "regulator"
          ? regulators
          : productType === "stove"
          ? stoves
          : [];
      const product = productList.find((product) => product.id === id);
      currentStock = product?.stock || 0;
    }

    return currentStock;
  };

  const handleItemAction = (action, id, productType, cylinderType) => {
    if (!activeSection) return;

    const isCylinder = productType === "cylinder";
    let currentStock = getCurrentStock(
      id,
      productType,
      cylinderType,
      selectedBrands,
      regulators,
      stoves
    );

    // handle all state updates for delivered items
    if (activeSection === "delivered") {
      if (action == "add") {
        setDeliveredItems((prev) => ({
          ...prev,
          [productType]: {
            ...(prev[productType] || {}),
            [id]:
              productType === "cylinder"
                ? {
                    ...(prev[productType]?.[id] || {}),
                    [cylinderType]:
                      (prev[productType]?.[id]?.[cylinderType] || 0) + 1,
                  }
                : (prev[productType]?.[id] || 0) + 1,
          },
        }));
        currentStock = Math.max(currentStock - 1, 0);
        updateStock(id, productType, cylinderType, currentStock);
      } else if (action === "decrement") {
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
          currentStock += 1;
          updateStock(id, productType, cylinderType, currentStock);

          return updated;
        });
      } else if (action === "remove") {
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

          currentStock += removedCount;
          updateStock(id, productType, cylinderType, currentStock);

          return updated;
        });
      }
    }

    // handle all state updates for received items
    if (activeSection === "received") {
      if (action == "add") {
        setReceivedItems((prev) => ({
          ...prev,
          [id]: {
            ...(prev[id] || {}),
            [cylinderType]: (prev[id]?.[cylinderType] || 0) + 1,
          },
        }));
      } else if (action === "decrement") {
        setReceivedItems((prev) => {
          const updated = JSON.parse(JSON.stringify(prev)); // JSON.parse(JSON.stringify(prev))

          if (updated[id]?.[cylinderType] > 1) {
            updated[id][cylinderType] -= 1;
          } else {
            delete updated[id][cylinderType];
            if (Object.keys(updated[id] || {}).length === 0) {
              delete updated[id];
            }
          }

          return updated;
        });
      } else if (action === "remove") {
        setReceivedItems((prev) => {
          const updated = { ...prev };
          delete updated[id]?.[cylinderType];
          if (Object.keys(updated[id] || {}).length === 0) {
            delete updated[id];
          }

          return updated;
        });
      }
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
          {active === "delivered" &&
            Object.entries(items).flatMap(([productType, productData]) => {
              return Object.entries(productData).flatMap(
                ([id, typesOrCount]) => {
                  if (productType === "cylinder") {
                    const brand = selectedBrands.find(
                      (brand) => brand.id === parseInt(id)
                    );
                    if (!brand) return [];
                    return Object.entries(typesOrCount).map(
                      ([cylinderType, count]) => {
                        serialCounter++;
                        const price =
                          brand?.cylinders?.find(
                            (cylinder) => cylinder.type === cylinderType
                          )?.price || 0;
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
                                    handleItemAction(
                                      "decrement",
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
                                    handleItemAction(
                                      "remove",
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
                                    handleItemAction(
                                      "remove",
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
                        ? regulators.find(
                            (regulator) => regulator.id === parseInt(id)
                          )
                        : stoves.find((stove) => stove.id === parseInt(id));

                    const count = typesOrCount;
                    serialCounter++;

                    const price = brand?.price || 0; // ......................................................

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
                            Tk {price}
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
                                handleItemAction(
                                  "decrement",
                                  brand.id,
                                  productType,
                                  null
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
                                handleItemAction(
                                  "remove",
                                  brand.id,
                                  productType,
                                  null
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
                                handleItemAction(
                                  "remove",
                                  brand.id,
                                  productType,
                                  null
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
                }
              );
            })}

          {active === "received" &&
            Object.entries(items).flatMap(([id, types]) => {
              const brand = allBrands.find(
                (brand) => brand.id === parseInt(id)
              );
              if (!brand) return [];

              return Object.entries(types).map(([cylinderType, count]) => {
                serialCounter++;
                const price =
                  brand?.cylinders?.find(
                    (cylinder) => cylinder.type === cylinderType
                  )?.price || 0;

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
                            handleItemAction(
                              "decrement",
                              brand.id,
                              null,
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
                            handleItemAction(
                              "remove",
                              brand.id,
                              null,
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
                            handleItemAction(
                              "remove",
                              brand.id,
                              null,
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
              });
            })}
        </tbody>
      </table>
    );
  };

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

  const newBrandList = [
    ...selectedBrands,
    ...allBrands.filter(
      (brand) => !selectedBrands.some((b) => b.id === brand.id)
    ),
  ];

  return (
    <div className={styles.wrapper}>
      <main className={styles.exchangeContainer}>
        <div className={styles.topButtonContainer}>
          <Button className={styles.backBtn} onClick={() => navigate(-1)}>
            Change Shop
          </Button>
          <Button onClick={handleClearLists}>Clear Lists</Button>
          <Button
            className={styles.nextBtn}
            onClick={() => handleNext(isNextDisabled)}
            disabled={isNextDisabled}
            data-tool-tip={isNextDisabled ? "Add items to proceed" : ""}
          >
            Next
          </Button>
        </div>
        <div className={styles.shopDetailsContainer}>Shop Details</div>
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
              onClick={() => {
                console.log(deliveredItems);
                console.log(receivedItems);
              }}
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
            {/* <Button onClick={handleClearLists}>Clear Lists</Button> */}
          </div>
        )}
        <div className={styles.bottomScrollable}>
          {activeCategory == "cylinders" &&
            newBrandList.map((brand) =>
              brand.cylinders.map((cylinder) => (
                <Card
                  key={`${brand.id}-${cylinder.type}`}
                  id={brand.id}
                  name={brand.name}
                  type={cylinder.type}
                  cardType={"cylinder"}
                  picture={cylinder.image}
                  price={cylinder.price}
                  stock={
                    selectedBrands.some(
                      (selectedBrand) => selectedBrand.id === brand.id
                    )
                      ? cylinder.stock
                      : null
                  }
                  activeSection={activeSection}
                  onAdd={() =>
                    handleItemAction("add", brand.id, "cylinder", cylinder.type)
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
                price={regulator.price}
                stock={regulator.stock}
                activeSection={activeSection}
                onAdd={() =>
                  handleItemAction("add", regulator.id, "regulator", null)
                }
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
                price={stove.price}
                stock={stove.stock}
                activeSection={activeSection}
                onAdd={() => handleItemAction("add", stove.id, "stove", null)}
              />
            ))}
        </div>
      </main>
    </div>
  );
};

export default Exchange;
