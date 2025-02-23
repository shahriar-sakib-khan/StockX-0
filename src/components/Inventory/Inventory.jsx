import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import allBrands from '../../assets/sorted-list-of-brands';
import Card from './Card';
import styles from './Inventory.module.css';

function Inventory() {
  const { selectedBrands } = useOutletContext();
  
  const [stocks, setStocks] = useState(() => {
    const storedStocks = localStorage.getItem("stocks");
    return storedStocks ? JSON.parse(storedStocks) : {};
  });

  useEffect(() => {
    localStorage.setItem("stocks", JSON.stringify(stocks));
  }, [stocks]);

  const updateStock = (id, newStock) => {
    setStocks(prevStocks => ({
      ...prevStocks,
      [id]: newStock
    }));
  }

  return (
    <div className={styles.inventoryContainer}>
      {selectedBrands.length > 0 ? (
        <div className={styles.grid}>
          {allBrands.filter(brand => selectedBrands.includes(brand.id))
          .map(brand => (
            <Card
              key={brand.id}
              id={brand.id}
              name={brand.name}
              picture={brand.cylinder}
              price={brand.price}
              stock={stocks[brand.id] ?? brand.stock}
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