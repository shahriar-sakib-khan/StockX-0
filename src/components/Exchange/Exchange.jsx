import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import allBrands from "../../assets/sorted-list-of-brands";
import Card from "./Card";
import styles from "./Exchange.module.css";

const Exchange = () => {
  const { selectedBrands } = useOutletContext();
  const [activeSection, setActiveSection] = useState(null);
  const [deliveredItems, setDeliveredItems] = useState({});
  const [receivedItems, setReceivedItems] = useState({});

  const handleSelectSection = (section) => {
    setActiveSection(section);
  };

  const handleAddItem = (brandName) => {
    if (!activeSection) return;

    if (activeSection === "delivered") {
      setDeliveredItems((prev) => ({
        ...prev,
        [brandName]: (prev[brandName] || 0) + 1,
      }));
    } else {
      setReceivedItems((prev) => ({
        ...prev,
        [brandName]: (prev[brandName] || 0) + 1,
      }));
    }
  };

  return (
    <div className={styles.exchangeContainer}>
      <div className={styles.sectionsContainer}>
        <div
          className={`${styles.section} ${
            activeSection === "delivered" ? styles.active : ""
          }`}
          onClick={() => handleSelectSection("delivered")}
        >
          <h3 className={styles.sectionTitles}>Delivered</h3>
          <div className={styles.itemList}>
            {Object.entries(deliveredItems).map(([item, count]) => (
              <div key={item} className={styles.itemRow}>
                {item} ({count})
              </div>
            ))}
          </div>
        </div>

        <div
          className={`${styles.section} ${
            activeSection === "received" ? styles.active : ""
          }`}
          onClick={() => handleSelectSection("received")}
        >
          <h3 className={styles.sectionTitles}>Received</h3>
          <div className={styles.itemList}>
            {Object.entries(receivedItems).map(([item, count]) => (
              <div key={item} className={styles.itemRow}>
                {item} ({count})
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomScrollable}>
        {allBrands.map((brand) =>
          selectedBrands.includes(brand.id) ? (
            <Card
              key={brand.id}
              id={brand.id}
              name={brand.name}
              picture={brand.cylinder}
              price={brand.price}
              onAdd={() => handleAddItem(brand.name)}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default Exchange;
