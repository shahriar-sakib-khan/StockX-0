import { useOutletContext } from 'react-router-dom';
import allBrands from '../../assets/list_of_brands';
import Card from './Card';
import styles from './Inventory.module.css';

function Inventory() {
  const { selectedBrands, stockCount, setStockCount, prices } = useOutletContext();

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

  <nav className={styles.secondaryNavbar}>
    <ul className={styles.secondaryNavList}>
      <li className={styles.secondaryNavItems}><a href="#cylinders" className={styles.secondaryNavLink}>Cylinders</a></li>
      <li className={styles.secondaryNavItems}><a href="#item2" className={styles.secondaryNavLink}>Item2</a></li>
      <li className={styles.secondaryNavItems}><a href="#item3" className={styles.secondaryNavLink}>Item3</a></li>
    </ul>
  </nav>

  {selectedBrands.length > 0 ? (
    <div className={styles.sectionHeader}>
      <h2 id="cylinders">Cylinders</h2>
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
                  price={prices[brand.id]?.[cylinder.type] ?? brand.price}
                  stock={stockCount[brand.id]?.[cylinder.type] ?? brand.stock}
                  updateStock={updateStock}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  ) : (
    <p>No brands selected</p>
  )}
  {selectedBrands.length > 0 ? (
    <div className={styles.sectionHeader}>
      <h2 id="item2">Second Type of Items</h2>
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
                price={prices[brand.id]?.[cylinder.type] ?? brand.price}
                stock={stockCount[brand.id]?.[cylinder.type] ?? brand.stock}
                updateStock={updateStock}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  ) : (
    <p>No brands selected</p>
  )}
    {selectedBrands.length > 0 ? (
    <div className={styles.sectionHeader}>
      <h2 id="item3">Third Type of Items</h2>
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
                price={prices[brand.id]?.[cylinder.type] ?? brand.price}
                stock={stockCount[brand.id]?.[cylinder.type] ?? brand.stock}
                updateStock={updateStock}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  ) : (
    <p>No brands selected</p>
  )}
  <a href="#" className={styles.backToTopBtn}>⬆️</a>
</div>
  )
}

export default Inventory;