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
  const [popupItem, setPopupItem] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleSelectSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleOpenPopup = (item) => {
    if (!activeSection) return;
    setPopupItem(item);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setPopupItem(null);
  };

  const handleSubmit = (value) => {
    if (!activeSection || !popupItem) return;
    if (activeSection === "delivered") {
      setDeliveredItems((prev) => ({ ...prev, [popupItem]: value }));
    } else {
      setReceivedItems((prev) => ({ ...prev, [popupItem]: value }));
    }
    handleClosePopup();
  };

  const handleItemRemove = (item, section) => {
    if (section === "delivered") {
      setDeliveredItems((prev) => {
        const updated = { ...prev };
        delete updated[item];
        return updated;
      });
    } else {
      setReceivedItems((prev) => {
        const updated = { ...prev };
        delete updated[item];
        return updated;
      });
    }
  };

  return (
    <div className={styles.exchangeContainer}>
      <div className={styles.sectionsContainer}>
        <div 
          className={`${styles.section} ${activeSection === "delivered" ? styles.active : ""}`}
          onClick={() => handleSelectSection("delivered")}
        >
          <h3>Delivered</h3>
          <div className={styles.itemList}>
            {Object.keys(deliveredItems).map((item) => (
              <div key={item} className={styles.itemCard}>
                <h4>{item}</h4>
                <button onClick={() => handleOpenPopup(item)}>Edit</button>
                <button onClick={() => handleItemRemove(item, "delivered")}>Remove</button>
              </div>
            ))}
          </div>
        </div>
        
        <div 
          className={`${styles.section} ${activeSection === "received" ? styles.active : ""}`}
          onClick={() => handleSelectSection("received")}
        >
          <h3>Received</h3>
          <div className={styles.itemList}>
            {Object.keys(receivedItems).map((item) => (
              <div key={item} className={styles.itemCard}>
                <h4>{item}</h4>
                <button onClick={() => handleOpenPopup(item)}>Edit</button>
                <button onClick={() => handleItemRemove(item, "received")}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.bottomScrollable}>
        {allBrands.map(brand => 
          selectedBrands.includes(brand.id) && (
            <Card
              key={brand.id}
              id={brand.id}
              name={brand.name}
              picture={brand.cylinder}
              price={brand.price}
            />
        ))}
      </div>

      {isPopupOpen && (
        <div className={styles.popup}>
          <h3>Edit {popupItem}</h3>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Exchange;
