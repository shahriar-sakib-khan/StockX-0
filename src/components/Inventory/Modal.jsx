import { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, onSubmit, modalType, stock }) {
  const [inputValue, setInputValue] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if(isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  
  const handleSubmit = () => {
    const value = parseInt(inputValue, 10);
    if(!isNaN(value) && value > 0) {
      if(modalType === "DECREASE" && value > stock && !showWarning) {
        setShowWarning(true);
      }
      else {
        const finalValue = modalType === "INCREASE" ? value : (value > stock ? stock : value);
        onSubmit(finalValue);
        closeAndReset();
      }
    }
  }
  
  const closeAndReset = () => {
    setInputValue('');
    setShowWarning(false);
    onClose();
  }
  
  const handleKeyDown = (e) => {
    if(e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
    else if(e.key === "Escape") {
      closeAndReset();
    }
  }

  if(!isOpen) return null;
  
  return (
    <div className={styles.modalOverlay} onClick={closeAndReset}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{modalType === "INCREASE" ? "Increase Stock" : "Decrease Stock"}</h3>
        {showWarning && (
          <div className={styles.warningContainer}>
            <div className={styles.warningBubble}>
              Entered amount is greater than available stock.
              Proceeding will set stock to 0.
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
          className={`${styles.noArrows} ${showWarning ? styles.inputWarning : ""}`}
        />
        <div className={styles.modalButtons}>
          <Button
            variant="cancel"
            onClick={closeAndReset}
          >Cancel</Button>
          <Button
            variant="submit"
            onClick={handleSubmit}
          >Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;