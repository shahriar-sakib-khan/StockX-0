import styles from './Card.module.css';

function Card({ id, name, picture, price }) {

  return (
    <>
      <div className={styles.card}>
        <button className={styles.plusBtn}>+</button>
        <img src={picture} alt={name} className={styles.image} />
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>Price: {price}</p>
      </div>
    </>
  );
}

export default Card;