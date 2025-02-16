import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import allBrands from '../../assets/sorted-list-of-brands';
import Card from './Card';
import styles from './Inventory.module.css';

function Inventory() {
  const { selectedBrands } = useOutletContext();

  const [brands, setBrands] = useState(allBrands);

  const updateStock = (id, newStock) => {
    setBrands(prevBrands =>
      prevBrands.map(brand =>
        brand.id === id ? {...brand, stock: newStock} : brand
      )
    );
  }

  return (
    <div className={styles.inventoryContainer}>
      {allBrands.length > 0 ? (
        <div className={styles.grid}>
          {allBrands.map(brand => 
          selectedBrands.includes(brand.id) && (
            <Card
              key={brand.id}
              id={brand.id}
              name={brand.name}
              picture={brand.cylinder}
              price={brand.price}
              stock={brand.stock}
              updateStock={updateStock}
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