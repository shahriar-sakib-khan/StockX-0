import styles from './Card.module.css';

function Card({ id, name, logo, isSelected, onSelect }) {
  
  return (
    <div className={[styles.card, isSelected ? styles.selected : ''].join(' ')}
        onClick={() => onSelect(id)}>
      <img src={logo} alt={name} className={styles.logo}></img>
      <p className={styles.name}>{name}</p>
    </div>
  );
}

export default Card;