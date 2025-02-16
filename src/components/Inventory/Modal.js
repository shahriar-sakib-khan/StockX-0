import { useState, useRef, useEffect } from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, onSubmit, modalType }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if(isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  
  const handleSubmit = () => {
    const value = parseInt(inputValue, 10);
    if(!isNaN(value) && value > 0) {
      onSubmit(value);
    }
    setInputValue('');
    onClose();
  }
  
  const handleKeyDown = (e) => {
    if(e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
    else if(e.key === "Escape") {
      onClose();
    }
  }

  if(!isOpen) return null;
  
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{modalType === "INCREASE" ? "Increase Stock" : "Decrease Stock"}</h3>
        <input
          ref={inputRef}
          type="number"
          min="1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter amount"
          onKeyDown={handleKeyDown}
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