import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import allBrands from "../../assets/list_of_brands";
import Card from "./Card";
import styles from "./Exchange.module.css";

const Exchange = () => {
  const { selectedBrands, stockCount, setStockCount } = useOutletContext();
  const [activeSection, setActiveSection] = useState(null);

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
    return Object.entries(items).flatMap(([id, cylinderTypes], index) => {
      const brand = allBrands.find((brand) => brand.id === parseInt(id));

      return Object.entries(cylinderTypes).map(([cylinderType, count]) => (
        <div key={`${id}-${cylinderType}`} className={styles.itemRow}>
          <span className={styles.serialNumber}>{index + 1}.</span>
          <span className={styles.name}>{brand?.name} - {cylinderType}</span>
          {brand && <img src={brand.logo} alt={brand.name} className={styles.brandLogo} />}
          <span className={styles.itemCount}>( {count} )</span>
          <button
            className={styles.decrementButton}
            onClick={() => handleDecrementItem(id, cylinderType)}
            disabled={activeSection !== active}
          >
            -
          </button>
          <button
            className={styles.removeButton}
            onClick={() => handleRemoveItem(id, cylinderType)}
            disabled={activeSection !== active}
          >
            Remove
          </button>
        </div>
      ));
    });
  };

  const selectedBrandsList = allBrands.filter((brand) => 
    selectedBrands.includes(brand.id)
  );

  return (
    <div className={styles.exchangeContainer}>
      <div className={styles.sectionsContainer}>
        {/* Delivered Section */}
        <div
          className={`${styles.section} ${
            activeSection === "delivered" ? styles.active : ""
          }`}
          onClick={() => handleSelectSection("delivered")}
        >
          <h3 className={styles.sectionTitles}>Delivered</h3>
          <div className={styles.itemList}>{renderItemList(deliveredItems, "delivered")}</div>
        </div>

        {/* Received Section */}
        <div
          className={`${styles.section} ${
            activeSection === "received" ? styles.active : ""
          }`}
          onClick={() => handleSelectSection("received")}
        >
          <h3 className={styles.sectionTitles}>Received</h3>
          <div className={styles.itemList}>{renderItemList(receivedItems, "received")}</div>
        </div>
      </div>

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
              price={brand.price}
              stock={selectedBrandsList.includes(brand) ? stockCount[brand.id]?.[cylinder.type] ?? 0 : null}
              activeSection={activeSection}
              onAdd={() => handleAddItem(brand.id, cylinder.type)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Exchange;