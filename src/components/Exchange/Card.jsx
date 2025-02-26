import styles from "./Card.module.css";

function Card({ name, type, picture, price, stock, onAdd }) {
  return (
    <div className={styles.card}>
      {stock != null && <div className={styles.stockCount}>Stock: {stock}</div>}
      <button className={styles.plusBtn} onClick={onAdd}>+</button>
      <img src={picture} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <span>{type}</span>
      <p className={styles.price}>Price: {price}</p>
    </div>
  );
}

export default Card;
