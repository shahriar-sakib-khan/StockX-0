import { useState, useRef, useEffect, cloneElement } from "react";
import Button from "../Button/Button";
import styles from "./Modal.module.css";

function Modal({
  isOpen,
  onClose,
  onSubmit,
  modalType,
  stock,
  productType,
  productData,
  setProductData,
}) {
  const [inputValue, setInputValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (modalType === "ADD_PRODUCT") {
      const { name, price, stock } = productData;

      if (!name.trim() || price === "" || stock === "") {
        setError("All fields are required!");
        return;
      }

      const parsedPrice = parseFloat(price);
      const parsedStock = parseInt(stock, 10);

      if (isNaN(parsedPrice) || parsedPrice < 0) {
        setError("Price must be a valid number!");
        return;
      }
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        setError("Price must be a positive number.");
        return;
      }

      onSubmit(productType, {
        name: name.trim(),
        price: parsedPrice,
        stock: parsedStock,
      });
      closeAndReset();
    } else {
      const value = parseInt(inputValue, 10);
      if (!isNaN(value) && value > 0) {
        if (modalType === "DECREASE" && value > stock && !showWarning) {
          setShowWarning(true);
        } else {
          const finalValue =
            modalType === "INCREASE" ? value : value > stock ? stock : value;
          onSubmit(finalValue);
          closeAndReset();
        }
      }
    }
  };

  const closeAndReset = () => {
    onClose();
    setInputValue("");
    setShowWarning(false);
    setError("");
    () => setProductData({ name: "", price: "", stock: "" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      closeAndReset();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {modalType === "ADD_PRODUCT" ? (
          <>
            <h3>
              Enter {productType === "regulator" ? "Regulator" : "Stove"}{" "}
              Details
            </h3>
            {error && <p className={styles.error}>{error}</p>}
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter name"
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
              onKeyDown={handleKeyDown}
            />
            <input
              type="number"
              placeholder="Enter price"
              min="0"
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
              onKeyDown={handleKeyDown}
              className={styles.noArrows}
            />
            <input
              type="number"
              placeholder="Enter stock count"
              min="1"
              value={productData.stock}
              onChange={(e) =>
                setProductData({ ...productData, stock: e.target.value })
              }
              onKeyDown={handleKeyDown}
              className={styles.noArrows}
            />
          </>
        ) : (
          <>
            <h3>
              {modalType === "INCREASE" ? "Increase Stock" : "Decrease Stock"}
            </h3>
            {showWarning && (
              <div className={styles.warningContainer}>
                <div className={styles.warningBubble}>
                  Entered amount is greater than available stock. Proceeding
                  will set stock to 0.
                </div>
              </div>
            )}
            <input
              ref={inputRef}
              type="number"
              min="1"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowWarning(false);
              }}
              placeholder="Enter amount"
              onKeyDown={handleKeyDown}
              className={`${styles.noArrows} ${
                showWarning ? styles.inputWarning : ""
              }`}
            />
          </>
        )}

        <div className={styles.modalButtons}>
          <Button variant="cancel" onClick={closeAndReset}>
            Cancel
          </Button>
          <Button variant="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
