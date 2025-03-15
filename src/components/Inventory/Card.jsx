import { useState } from "react";
import Modal from './Modal';
import styles from './Card.module.css';

function Card({ id, name, type, cardType, picture, price, stock, updateStock }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleStockChange = (value) => {
    if(modalType === "INCREASE") {
      updateStock(id, type, stock + value);
    }
    else if(modalType === "DECREASE" && stock - value >= 0) {
      updateStock(id, type, stock - value);
    }
  }

  const typeClassName = `type-${type}`;

  return (
    <>
      <div className={`${styles.card} ${styles[typeClassName]}`}>
        <span className={styles.stockCount}>Stock: {stock}</span>
        <img src={picture} alt={name} className={styles.image} />
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.price}>Price: {price}</p>
        {(cardType === "cylinder") && 
          <div className={styles.controls}>
          <button onClick={() => openModal("DECREASE")} className={styles.minusBtn} disabled={stock === 0}>-</button>
          <button onClick={() => openModal("INCREASE")} className={styles.plusBtn}>+</button>
        </div>
        }
        <span className={styles.type}>{type}</span>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSubmit={handleStockChange} 
        modalType={modalType}
        stock={stock}
      />
    </>
  );
}

export default Card;