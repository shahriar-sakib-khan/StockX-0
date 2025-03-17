import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import allBrands from '../../assets/Lists/list_of_brands';
import Card from './Card';
import regulators from '../../assets/Lists/regulator_list';
import stoves from '../../assets/Lists/stove_list';
import styles from './Inventory.module.css';

function Inventory() {
  const { selectedBrands, stockCount, setStockCount, prices } = useOutletContext();
  const [activeSection, setActiveSection] = useState("cylinders");
  const [scrollPadding, setScrollPadding] = useState(0);

  useEffect(() => {
    const updatePadding = () => {
      const primaryNavbar = document.getElementById("primary-navbar");
      const secondaryNavbar = document.getElementById("secondary-navbar");

      const primaryHeight = primaryNavbar?.offsetHeight || 0;
      const secondaryHeight = secondaryNavbar?.offsetHeight || 0;
      const totalHeight = primaryHeight + secondaryHeight;

      setScrollPadding(totalHeight);
      document.documentElement.style.setProperty("--scroll-padding", `${totalHeight}px`);
    }

    updatePadding();
    window.addEventListener("resize", updatePadding);

    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      const top = window.scrollY;
      
      sections.forEach(section => {
        const offset = section.offsetTop - scrollPadding - 100;
        const height = section.offsetHeight;
        const id = section.id;
        
        
        if(top >= offset && top < offset + height)
          setActiveSection(id);
      });
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updatePadding);
      window.removeEventListener("scroll", handleScroll);
    }
  }, [scrollPadding]);

  const updateStock = (id, productType, cylinderType, value) => {
    const newValue = parseFloat(value);

    setStockCount((prev) => ({
      ...prev,
      [productType]: { 
        ...(prev[productType] || {} ),
        [id]: productType === "cylinder"
          ? { ...(prev[productType]?.[id] || {}), [cylinderType]: newValue}
          : newValue,
      },
    }));
  };

  return (
  <div className={styles.wrapper}>
    <div className={styles.secondaryNavbar} id="secondary-navbar">
      <ul className={styles.secondaryNavList}>
        <li className={styles.secondaryNavItems}><a href="#cylinders" className={`${styles.secondaryNavLink} ${activeSection === "cylinders" ? styles.active : ""}`}>Cylinders</a></li>
        <li className={styles.secondaryNavItems}><a href="#regulators" className={`${styles.secondaryNavLink} ${activeSection === "regulators" ? styles.active : ""}`}>Regulators</a></li>
        <li className={styles.secondaryNavItems}><a href="#stoves" className={`${styles.secondaryNavLink} ${activeSection === "stoves" ? styles.active : ""}`}>Stoves</a></li>
      </ul>
      <ul className={styles.secondaryNavList}>
        <li className={styles.secondaryNavItems}><a href="/empty-cylinders" className={styles.secondaryNavLink}>Empty Cylinders</a></li>
      </ul>
    </div>

    {selectedBrands.length > 0 ? (
      <section id="cylinders" className={styles.main}>
        <h1>Cylinders</h1>
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
                  price={prices?.cylinder?.[brand.id]?.[cylinder.type] ?? brand.price}
                  stock={stockCount?.cylinder?.[brand.id]?.[cylinder.type] ?? brand.stock}
                  updateStock={updateStock}
                />
              ))
            ))}
        </div>
      </section>
    ) : (
      <p className={styles.noBrands}>No brands selected</p>
    )}
      <section id="regulators" className={styles.main}>
        <h1>Regulators</h1>
        <div className={styles.grid}>
        {regulators.map((regulator) => (
          <Card
            key={`regulator-${regulator.id}`}
            id={regulator.id}
            name={regulator.name}
            cardType={"regulator"}
            picture={regulator.image}
            price={prices?.regulator?.[regulator.id] ?? regulator.price}
            stock={stockCount?.regulator?.[regulator.id] ?? regulator.stock}
            updateStock={updateStock}
          />
        ))}
        </div>
      </section>
      <section id="stoves" className={styles.main}>
        <h1>Stoves</h1>
        <div className={styles.grid}>
        {stoves.map((stove) => (
          <Card
            key={`stove-${stove.id}`}
            id={stove.id}
            name={stove.name}
            cardType={"stove"}
            picture={stove.image}
            price={prices?.stove?.[stove.id] ?? stove.price}
            stock={stockCount?.stove?.[stove.id] ?? stove.stock}
            updateStock={updateStock}
          />
        ))}
        </div>
      </section>
    <a href="#" className={styles.backToTopBtn}>⬆</a>
  </div>
  )
}

export default Inventory;