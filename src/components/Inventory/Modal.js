import { useState } from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, onSubmit, modalType }) {
  const [inputValue, setInputValue] = useState('');

  if(!isOpen) return null;

  const handleSubmit = () => {
    const value = parseInt(inputValue, 10);
    if(!isNaN(value) && value > 0) {
      onSubmit(value);
    }
    setInputValue('');
    onClose();
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{modalType === "INCREASE" ? "Increase Stock" : "Decrease Stock"}</h3>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter amount"
          min="1"
          className={styles.noArrows}
        />
        <div className={styles.modalButtons}>
          <button onClick={onClose} className={styles.cancelBtn}>Cancel</button>
          <button onClick={handleSubmit} className={styles.submitBtn}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;