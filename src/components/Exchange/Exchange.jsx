import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import allBrands from "../../assets/list_of_brands";
import Card from "./Card";
import Button from "../Button/Button";
import styles from "./Exchange.module.css";

const Exchange = () => {
  const { selectedBrands, stockCount, setStockCount, prices } = useOutletContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeCategory, setActiveCategory] = useState("cylinders");
  const [activeSection, setActiveSection] = useState("delivered");
  const navigate = useNavigate();

  const [deliveredItems, setDeliveredItems] = useState(() => {
    return JSON.parse(localStorage.getItem("deliveredItems") || "{}");
  });

  const [receivedItems, setReceivedItems] = useState(() => {
    return JSON.parse(localStorage.getItem("receivedItems") || "{}");
  });

  useEffect(() => {
    localStorage.setItem("deliveredItems", JSON.stringify(deliveredItems));
  }, [deliveredItems]);

  useEffect(() => {
    localStorage.setItem("receivedItems", JSON.stringify(receivedItems));
  }, [receivedItems]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateStock = (id, cylinderType, newStock) => {
    setStockCount((prevStocks) => ({
      ...prevStocks,
      [id]: {
        ...(prevStocks[id] || {} ),
        [cylinderType]: newStock,
      },
    }));
  };
  
  const handleSelectSection = (section) => {
    setActiveSection(section);
  };

  const handleAddItem = (id, cylinderType) => {
    if (!activeSection) return;

    if (activeSection === "delivered") {
      if((stockCount[id]?.[cylinderType] || 0) === 0)
        return;

      setDeliveredItems((prev) => ({
        ...prev,
        [id]: {
          ...(prev[id] || {}),
          [cylinderType]: (prev[id]?.[cylinderType] || 0) + 1,
        }
      }));

      const newStock = Math.max((stockCount[id]?.[cylinderType] || 0) - 1, 0);
      updateStock(id, cylinderType, newStock);

    } else {
      setReceivedItems((prev) => ({
        ...prev,
        [id]: {
          ...(prev[id] || {}),
          [cylinderType]: (prev[id]?.[cylinderType] || 0) + 1,
        }
      }));
    }
  };

  const handleDecrementItem = (id, cylinderType) => {
    if (!activeSection) return;

    if (activeSection === "delivered") {
      setDeliveredItems((prev) => {
        const updated = { ...prev };

        if (updated[id]?.[cylinderType] > 1) {
          updated[id][cylinderType] -= 1;
        } else {
          delete updated[id][cylinderType];
          if(Object.keys(updated[id]).length === 0) {
            delete updated[id];
          }
        }
        
        const newStock = Math.max((stockCount[id]?.[cylinderType] || 0) + 1, 0);
        updateStock(id, cylinderType, newStock);

        return updated;
      });
      
    } else {
      setReceivedItems((prev) => {
        const updated = { ...prev };
        if (updated[id]?.[cylinderType] > 1) {
          updated[id][cylinderType] -= 1;
        } else {
          delete updated[id][cylinderType];

          if(Object.keys(updated[id]).length === 0) {
            delete updated[id];
          }
        }
        return updated;
      });
    }
  };

  
  const handleRemoveItem = (id, cylinderType) => {
    if (!activeSection) return;
    
    if (activeSection === "delivered") {
      setDeliveredItems((prev) => {
        const updated = { ...prev };
        const removedCount = updated[id]?.[cylinderType] || 0;

        if(cylinderType) {
          delete updated[id]?.[cylinderType];
          if(Object.keys(updated[id] || {}).length === 0) {
            delete updated[id];
          }
        }
        else {
          delete updated[id];
        }

        setStockCount((prevStocks) => ({
          ...prevStocks,
          [id]: {
            ...(prevStocks[id] || {}),
            [cylinderType]: (prevStocks[id]?.[cylinderType] || 0) + removedCount,
          },
        }));

        return updated;
      });

    } else {
      setReceivedItems((prev) => {
        const updated = { ...prev };
        if(cylinderType) {
          delete updated[id]?.[cylinderType];
          if(Object.keys(updated[id] || {}).length === 0) {
            delete updated[id];
          }
        }
        else {
          delete updated[id];
        }
        return updated;
      });
    }
  };

  const renderItemList = (items, active) => {
    let serialCounter = 0;
    return (
      <table className={styles.tableContainer} role="table">
        { /* Object.keys(items).length > 0 && */
        <thead role="rowgroup">
          <tr role="row">
            <th role="cell">#</th>
            <th role="cell">Brand</th>
            <th role="cell">Type</th>
            <th role="cell">Logo</th>
            {(active !== "received") && <th role="cell">Price</th>}
            <th role="cell">Quantity</th>
            <th role="cell">Action</th>
          </tr>
        </thead>
        }
        <tbody role="rowgroup">
          {Object.entries(items).flatMap(([id, cylinderTypes]) => {
            const brand = allBrands.find((brand) => brand.id === parseInt(id));
            if (!brand) return [];
            return Object.entries(cylinderTypes).map(([cylinderType, count]) => {
              serialCounter++;
              const price = prices[brand?.id]?.[cylinderType] || 0 ;
              return (
                <tr key={`${id}-${cylinderType}`} role="row">
                  <td role="cell" data-cell="#: ">{serialCounter}.</td>
                  <td role="cell" data-cell="Brand: ">{brand?.name || "Unknown"}</td>
                  <td role="cell" data-cell="Type: " className={styles[`type-${cylinderType}`]}>{cylinderType}</td>
                  <td role="cell" data-cell="Logo: ">
                    {brand && (
                      <img src={brand.logo} alt={brand.name} className={styles.logo} />
                    )}
                  </td >
                  {(active !== "received") && <td role="cell" data-cell="Price: ">Tk {price.toFixed(2)}</td>}
                  <td role="cell" data-cell="Quantity: ">{count}</td>
                  <td role="cell" data-cell="Action: ">
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.decrementButton}
                        onClick={() => handleDecrementItem(brand.id, cylinderType)}
                        disabled={activeSection !== active}
                      >
                        -
                      </button>
                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemoveItem(brand.id, cylinderType)}
                        disabled={activeSection !== active}
                      >
                        Remove
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
  

  const selectedBrandsList = allBrands.filter((brand) => 
    selectedBrands.includes(brand.id)
  );

  const handleNext = (isNextDisabled) => {
    if(!isNextDisabled) {
      navigate("/receipts", {
        state: { deliveredItems, receivedItems }
      });
    }
  }

  const isNextDisabled = !(Object.keys(deliveredItems).length > 0) && !(Object.keys(receivedItems).length > 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.exchangeContainer}>
        <div className={styles.secondaryNavbar}>
          <ul className={styles.secondaryNavList}>
            {["cylinders", "regulators","stoves"].map((category) => (
              <li key={category} className={styles.secondaryNavItems}>
                <Button
                  variant="light"
                  className={`${styles.secondaryNavLink} ${activeCategory === category ? styles.activeBtn : ""}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              </li>
            ))}
          </ul>
          <ul className={styles.secondaryNavList}>
            <li className={styles.secondaryNavItems}>
              <Button
                className={styles.nextBtn}
                onClick={() => handleNext(isNextDisabled)}
                disabled={isNextDisabled}
                data-tool-tip={isNextDisabled ? "Add items to proceed" : ""}
              >Next</Button>
            </li>
          </ul>
        </div>
        <div className={styles.sectionsContainer}>
          {/* Delivered Section */}
          <div
            className={`${styles.section} ${styles.delivered} ${activeSection === "delivered" ? styles.active : ""} ${windowWidth < 768 && activeSection !== "delivered" ? styles.hidden : ""}`}
            onClick={() => handleSelectSection("delivered")}
          >
            <h3 className={styles.sectionTitles}>Delivered</h3>
            <div className={styles.itemList}>{renderItemList(deliveredItems, "delivered")}</div>
          </div>
          {/* Received Section */}
          <div
            className={`${styles.section} ${styles.received} ${activeSection === "received" ? styles.active : ""} ${windowWidth < 768 && activeSection !== "received" ? styles.hidden : ""}`}
            onClick={() => handleSelectSection("received")}
          >
            <h3 className={styles.sectionTitles}>Received</h3>
            <div className={styles.itemList}>{renderItemList(receivedItems, "received")}</div>
          </div>
        </div>
      
        {windowWidth < 768 && (
        <div className={styles.buttonContainer}>
          <Button
            variant="outline"
            className={styles.deliveredBtn}
            onClick={() => handleSelectSection(activeSection === "delivered" ? "received" : "delivered")}
          >
            {activeSection === "delivered" ? "Received" : "Delivered"}
          </Button>
        </div>)}
        <div className={styles.bottomScrollable}>
          {[
            ...allBrands.filter((brand) => selectedBrands.includes(brand.id)),
            ...allBrands.filter((brand) => !selectedBrands.includes(brand.id)),
          ].map((brand) =>
            brand.cylinders.map((cylinder) => (
              <Card
                key={`${brand.id}-${cylinder.type}`}
                id={brand.id}
                name={brand.name}
                type={cylinder.type}
                picture={cylinder.image}
                price={prices[brand.id]?.[cylinder.type] ?? 0}
                stock={selectedBrandsList.includes(brand) ? stockCount[brand.id]?.[cylinder.type] ?? 0 : null}
                activeSection={activeSection}
                onAdd={() => handleAddItem(brand.id, cylinder.type)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Exchange;