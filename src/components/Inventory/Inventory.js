import allBrands from '../../assets/sorted-list-of-brands';
import Card from './Card';
import styles from './Inventory.module.css';

function Inventory() {  

  return (
    <div className={styles.inventoryContainer}>
      <h2>Inventory</h2>
      {allBrands.length > 0 ? (
        <div className={styles.grid}>
          {allBrands.map(brand => (
            <Card
              key={brand.id}
              id={brand.id}
              name={brand.name}
              picture={brand.cylinder}
              price={brand.price}
              stock={brand.stock}
            />
          ))}
        </div>
      ) : (
        <p>No brands selected</p>
      )}
    </div>
  )
}

export default Inventory;