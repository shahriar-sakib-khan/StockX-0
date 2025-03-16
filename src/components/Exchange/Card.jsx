import styles from "./Card.module.css";

function Card({ name, type, cardType, picture, price, stock, activeSection, onAdd }) {
  const typeClassName = `type-${type}`;
  const isButtonDisabled = !activeSection || (activeSection === "delivered" && (parseInt(stock) === 0 || stock === null));

  return (
    <div className={`${styles.card} ${cardType === "cylinder" ? styles[typeClassName] : ""}`}>
      {typeof stock === "number" && <div className={styles.stockCount}>Stock: {stock}</div>}
      <button
        className={styles.plusBtn}
        onClick={onAdd}
        disabled={isButtonDisabled}
        data-tool-tip={!activeSection ? "select a section first" : stock === 0 ? "Out of stock" : stock === null ? "Not in stock" : ""}
      >+</button>

      <img src={picture} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.price}>Price: Tk {price}</p>
      <span className={styles.type}>{type}</span>
    </div>
  );
}

export default Card;
