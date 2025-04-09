import { useState } from "react";
import Modal from "./Modal";
import styles from "./Card.module.css";
import { useLocation } from "react-router-dom";

function Card({
  id,
  name,
  type,
  cardType,
  picture,
  price,
  stock,
  updateStock,
}) {
  const location = useLocation();
  const noAction = location.pathname === "/inventory";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleStockChange = (value) => {
    if (modalType === "INCREASE") {
      updateStock(id, cardType, type, stock + value);
    } else if (modalType === "DECREASE" && stock - value >= 0) {
      updateStock(id, cardType, type, stock - value);
    }

    setIsModalOpen(false);
  };

  const typeClassName = `type-${type}`;

  return (
    <>
      <div
        className={`${styles.card} ${
          cardType === "cylinder" ? styles[typeClassName] : ""
        }`}
      >
        <span className={styles.stockCount}>Stock: {stock}</span>
        <img src={picture} alt={name} className={styles.image} />
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.price}>Price: Tk {price}</p>
        {!noAction && (
          <div className={styles.controls}>
            <button
              onClick={() => openModal("DECREASE")}
              className={styles.minusBtn}
              disabled={stock === 0}
            >
              -
            </button>
            <button
              onClick={() => openModal("INCREASE")}
              className={styles.plusBtn}
            >
              +
            </button>
          </div>
        )}
        <span className={styles.type}>{type}</span>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleStockChange}
        modalType={modalType}
        stock={stock}
      />
    </>
  );
}

export default Card;
