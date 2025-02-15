import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { items2 } from "../list_of_items";  // Import items2 from the list_of_items file
import "../styles/ThirdPage.css";

const ThirdPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems, counterValues } = location.state || {};

  const [activeSection, setActiveSection] = useState(null); // Track active section (Delivered/Received)
  const [deliveredItems, setDeliveredItems] = useState(() => {
    const storedDeliveredItems = JSON.parse(localStorage.getItem("deliveredItems"));
    return storedDeliveredItems || {}; 
  });
  const [receivedItems, setReceivedItems] = useState(() => {
    const storedReceivedItems = JSON.parse(localStorage.getItem("receivedItems"));
    return storedReceivedItems || {};
  });
  const [popupItem, setPopupItem] = useState(null); // Item to be customized
  const [isPopupOpen, setPopupOpen] = useState(false); // Popup open state

  useEffect(() => {
    if (!selectedItems || !counterValues) {
      navigate("/", { replace: true });
    }

    const storedDate = localStorage.getItem("pageDate");
    if (!storedDate) {
      const currentDate = new Date().toLocaleDateString();
      localStorage.setItem("pageDate", currentDate);
    }
  }, [selectedItems, counterValues, navigate]);

  useEffect(() => {
    if (deliveredItems) {
      localStorage.setItem("deliveredItems", JSON.stringify(deliveredItems));
    }
    if (receivedItems) {
      localStorage.setItem("receivedItems", JSON.stringify(receivedItems));
    }
  }, [deliveredItems, receivedItems]);

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
    } else if (activeSection === "received") {
      setReceivedItems((prev) => ({ ...prev, [popupItem]: value }));
    }

    handleClosePopup();
  };

  const handleRemove = () => {
    if (!activeSection || !popupItem) return;

    if (activeSection === "delivered") {
      setDeliveredItems((prev) => {
        const updatedItems = { ...prev };
        delete updatedItems[popupItem];
        return updatedItems;
      });
    } else if (activeSection === "received") {
      setReceivedItems((prev) => {
        const updatedItems = { ...prev };
        delete updatedItems[popupItem];
        return updatedItems;
      });
    }

    handleClosePopup();
  };

  const handleItemRemove = (item, section) => {
    if (section === "delivered") {
      setDeliveredItems((prev) => {
        const updatedItems = { ...prev };
        delete updatedItems[item];
        return updatedItems;
      });
    } else if (section === "received") {
      setReceivedItems((prev) => {
        const updatedItems = { ...prev };
        delete updatedItems[item];
        return updatedItems;
      });
    }
  };

  const handleSelectSection = (section) => {
    if (activeSection !== section) {
      setActiveSection(section);
    }
  };

  const handleDeselectSection = (section) => {
    if (activeSection === section) {
      setActiveSection(null);
    }
  };

  return (
    <div className="third-page-container">
      <div className="top-bar">
        <h2>Exchange</h2>
        <button className="go-back-btn" onClick={() => navigate("/")}>Go Back</button>
      </div>

      <div className="top-half">
        <div
          className={`delivered ${activeSection === "delivered" ? "selected" : ""}`}
          onClick={() => handleSelectSection("delivered")}
          onDoubleClick={() => handleDeselectSection("delivered")}
        >
          <h3 className="section-heading">Delivered</h3>
          <div className="item-list">
            {Object.keys(deliveredItems).map((itemName) => {
              const item = items2.find((i) => i.name === itemName);
              return item ? (
                <div key={item.id} className="item-card">
                  <img
                    src={item.image || `https://via.placeholder.com/100?text=${item.name}`}
                    alt={item.name}
                    className="item-image"
                  />
                  <h4>{item.name}</h4>
                  <button 
                    className="count-btn"
                    onClick={() => handleOpenPopup(item.name)}
                  >
                     {deliveredItems[itemName]}
                  </button>
                  <button className="customize-item-btn" onClick={() => handleOpenPopup(item.name)}>Customize</button>
                  <button className="remove-item-btn" onClick={() => handleItemRemove(item.name, "delivered")}>Remove</button>
                </div>
              ) : null;
            })}
          </div>
        </div>

        <div
          className={`received ${activeSection === "received" ? "selected" : ""}`}
          onClick={() => handleSelectSection("received")}
          onDoubleClick={() => handleDeselectSection("received")}
        >
          <h3 className="section-heading">Received</h3>
          <div className="item-list">
            {Object.keys(receivedItems).map((itemName) => {
              const item = items2.find((i) => i.name === itemName);
              return item ? (
                <div key={item.id} className="item-card">
                  <img
                    src={item.image || `https://via.placeholder.com/100?text=${item.name}`}
                    alt={item.name}
                    className="item-image"
                  />
                  <h4>{item.name}</h4>
                  <button 
                    className="count-btn"
                    onClick={() => handleOpenPopup(item.name)}
                  >
                    {receivedItems[itemName]}
                  </button>
                  <button className="customize-item-btn" onClick={() => handleOpenPopup(item.name)}>Customize</button>
                  <button className="remove-item-btn" onClick={() => handleItemRemove(item.name, "received")}>Remove</button>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="bottom-half">
        {items2.map((item) => (
          <div key={item.id} className="item-card">
            <button className="plus-btn" onClick={() => handleOpenPopup(item.name)}>+</button>
            <img
              src={item.image || `https://via.placeholder.com/100?text=${item.name}`}
              alt={item.name}
              className="item-image"
            />
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <Popup
          item={popupItem}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleSubmit}
          onRemove={handleRemove} // Pass the remove function here
        />
      )}
    </div>
  );
};

export default ThirdPage;
