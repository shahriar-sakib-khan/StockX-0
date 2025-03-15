import { useOutletContext } from 'react-router-dom';
import allBrands from '../../assets/list_of_brands';
import Card from './Card';
import regulators from '../../assets/regulator_list';
import stoves from '../../assets/stove_list';
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
  <div className={styles.wrapper}>
    <div className={styles.secondaryNavbar}>
      <ul className={styles.secondaryNavList}>
        <li className={styles.secondaryNavItems}><a href="#cylinders" className={styles.secondaryNavLink}>Cylinders</a></li>
        <li className={styles.secondaryNavItems}><a href="#regulators" className={styles.secondaryNavLink}>Regulators</a></li>
        <li className={styles.secondaryNavItems}><a href="#stoves" className={styles.secondaryNavLink}>Stoves</a></li>
      </ul>
      <ul className={styles.secondaryNavList}>
        <li className={styles.secondaryNavItems}><a href="/empty-cylinders" className={styles.secondaryNavLink}>Empty Cylinders</a></li>
      </ul>
    </div>

    {selectedBrands.length > 0 ? (
      <div className={styles.main}>
        <h1 id="cylinders">Cylinders</h1>
        <div className={styles.grid}>
          {allBrands
            .filter(brand => selectedBrands.includes(brand.id))
            .map(brand => (
                brand.cylinders.map((cylinder) => (
                  <Card
                    key={`${brand.id}-${cylinder.type}`}
                    id={brand.id}
                    name={brand.name}
                    type={cylinder.type}
                    cardType={"cylinder"}
                    picture={cylinder.image}
                    price={prices[brand.id]?.[cylinder.type] ?? brand.price}
                    stock={stockCount[brand.id]?.[cylinder.type] ?? brand.stock}
                    updateStock={updateStock}
                  />
                ))
            ))}
        </div>
      </div>
    ) : (
      <p className={styles.noBrands}>No brands selected</p>
    )}
    {selectedBrands.length > 0 ? (
      <div className={styles.main}>
        <h1 id="regulators">Regulators</h1>
        <div className={styles.grid}>
        {regulators.map((regulator) => (
                  <Card
                    key={`regulator-${regulator.id}`}
                    id={regulator.id}
                    name={regulator.name}
                    cardType={"regulator"}
                    picture={regulator.image}
                    price={regulator.price}
                    stock={regulator.stock}
                    updateStock={updateStock}
                  />
        ))}
        </div>
      </div>
    ) : (
      <p className={styles.noBrands}>No brands selected</p>
    )}
      {selectedBrands.length > 0 ? (
      <div className={styles.main}>
        <h1 id="stoves">Stoves</h1>
        <div className={styles.grid}>
        {stoves.map((stove) => (
                  <Card
                    key={`stove-${stove.id}`}
                    id={stove.id}
                    name={stove.name}
                    cardType={"stove"}
                    picture={stove.image}
                    price={stove.price}
                    stock={stove.stock}
                    updateStock={updateStock}
                  />
            ))}
        </div>
      </div>
    ) : (
      <p className={styles.noBrands}>No brands selected</p>
    )}
    <a href="#" className={styles.backToTopBtn}>⬆</a>
  </div>
  )
}

export default Inventory;