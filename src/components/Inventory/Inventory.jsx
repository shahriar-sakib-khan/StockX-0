import { useOutletContext } from 'react-router-dom';
import allBrands from '../../assets/list_of_brands';
import Card from './Card';
import styles from './Inventory.module.css';

function Inventory() {
  const { selectedBrands, stockCount, setStockCount } = useOutletContext();

  const updateStock = (id, cylinderType, newStock) => {
    setStockCount(prevStocks => ({
      ...prevStocks,
      [id]: {
        ...(prevStocks[id] || {}),
        [cylinderType]: newStock
      }
    }));
  }

  return (
<div className={styles.inventoryContainer}>
  {selectedBrands.length > 0 ? (
    <div className={styles.grid}>
      {allBrands
        .filter(brand => selectedBrands.includes(brand.id))
        .map(brand => (
          <div key={brand.id} className={styles.brandContainer}>
            {brand.cylinders.map((cylinder, index) => (
              <Card
                key={`${brand.id}-${cylinder.type}`}
                id={brand.id}
                name={brand.name}
                type={cylinder.type}
                picture={cylinder.image}
                price={brand.price}
                stock={stockCount[brand.id]?.[cylinder.type] ?? brand.stock}
                updateStock={updateStock}
              />
            ))}
          </div>
        ))}
    </div>
  ) : (
    <p>No brands selected</p>
  )}
</div>

  )
}

export default Inventory;