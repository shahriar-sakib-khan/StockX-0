import { useState } from "react";
import Modal from './Modal';
import styles from './Card.module.css';

function Card({ id, name, picture, price, stock, updateStock }) {
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
      updateStock(id, stock + value);
    }
    else if(modalType === "DECREASE" && stock - value >= 0) {
      updateStock(id, stock - value);
    }
  }

  return (
    <>
      <div className={styles.card}>
        <span className={styles.stockCount}>In Stock: {stock}</span>
        <img src={picture} alt={name} className={styles.image} />
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>Price: {price}</p>
        <div className={styles.controls}>
          <button onClick={() => openModal("DECREASE")} className={styles.minusBtn}>-</button>
          <button onClick={() => openModal("INCREASE")} className={styles.plusBtn}>+</button>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSubmit={handleStockChange} 
        modalType={modalType} 
      />
    </>
  );
}

export default Card;