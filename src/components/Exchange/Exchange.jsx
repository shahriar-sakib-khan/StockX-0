import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import allBrands from "../../assets/list_of_brands";
import Card from "./Card";
import styles from "./Exchange.module.css";

const Exchange = () => {
  const { selectedBrands } = useOutletContext();
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

  const handleSelectSection = (section) => {
    setActiveSection(section);
  };

  const handleAddItem = (brandName, cylinderType) => {
    if (!activeSection) return;

    if (activeSection === "delivered") {
      setDeliveredItems((prev) => ({
        ...prev,
        [brandName]: {
          ...(prev[brandName] || {}),
          [cylinderType]: (prev[brandName]?.[cylinderType] || 0) + 1,
        }
      }));
    } else {
      setReceivedItems((prev) => ({
        ...prev,
        [brandName]: {
          ...(prev[brandName] || {}),
          [cylinderType]: (prev[brandName]?.[cylinderType] || 0) + 1,
        }
      }));
    }
  };

  const handleDecrementItem = (brandName, cylinderType) => {
    if (!activeSection) return;

    if (activeSection === "delivered") {
      setDeliveredItems((prev) => {
        const updated = { ...prev };
        if (updated[brandName]?.[cylinderType] > 1) {
          updated[brandName][cylinderType] -= 1;
        } else {
          delete updated[brandName][cylinderType];

          if(Object.keys(updated[brandName]).length === 0) {
            delete updated[brandName];
          }
        }
        return updated;
      });
    } else {
      setReceivedItems((prev) => {
        const updated = { ...prev };
        if (updated[brandName]?.[cylinderType] > 1) {
          updated[brandName][cylinderType] -= 1;
        } else {
          delete updated[brandName][cylinderType];

          if(Object.keys(updated[brandName]).length === 0) {
            delete updated[brandName];
          }
        }
        return updated;
      });
    }
  };

  
  const handleRemoveItem = (brandName, cylinderType) => {
    if (!activeSection) return;

    if (activeSection === "delivered") {
      setDeliveredItems((prev) => {
        const updated = { ...prev };

        if(cylinderType) {
          delete updated[brandName]?.[cylinderType];

          if(Object.keys(updated[brandName] || {}).length === 0) {
            delete updated[brandName];
          }
        }
        else {
          delete updated[brandName];
        }
        return updated;
      });
    } else {
      setReceivedItems((prev) => {
        const updated = { ...prev };

        if(cylinderType) {
          delete updated[brandName]?.[cylinderType];

          if(Object.keys(updated[brandName] || {}).length === 0) {
            delete updated[brandName];
          }
        }
        else {
          delete updated[brandName];
        }
        return updated;
      });
    }
  };

  const renderItemList = (items, active) => {
    return Object.entries(items).flatMap(([brandName, cylinderTypes], index) => {
      const brand = allBrands.find((brand) => brand.name === brandName);

      return Object.entries(cylinderTypes).map(([cylinderType, count]) => (
        <div key={`${brandName}-${cylinderType}`} className={styles.itemRow}>
          <span className={styles.serialNumber}>{index + 1}.</span>
          <span className={styles.name}>{brandName} - {cylinderType}</span>
          {brand && <img src={brand.logo} alt={brand.name} className={styles.brandLogo} />}
          <span className={styles.itemCount}>( {count} )</span>
          <button
            className={styles.decrementButton}
            onClick={() => handleDecrementItem(brandName, cylinderType)}
            disabled={activeSection !== active}
          >
            -
          </button>
          <button
            className={styles.removeButton}
            onClick={() => handleRemoveItem(brandName, cylinderType)}
            disabled={activeSection !== active}
          >
            Remove
          </button>
        </div>
      ));
    });
  };

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
        {allBrands.map((brand) =>
          selectedBrands.includes(brand.id)
           ? brand.cylinders.map((cylinder) => (
              <Card
                key={`${brand.id}-${cylinder.type}`}
                id={brand.id}
                name={brand.name}
                type={cylinder.type}
                picture={cylinder.image}
                price={brand.price}
                onAdd={() => handleAddItem(brand.name, cylinder.type)}
              />
            )) 
          : null
        )}
      </div>
    </div>
  );
};

export default Exchange;
