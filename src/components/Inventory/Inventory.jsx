import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import allBrands from "../../assets/Lists/list_of_brands";
import regulators from "../../assets/Lists/regulator_list";
import stoves from "../../assets/Lists/stove_list";
import Card from "./Card";
import styles from "./Inventory.module.css";

function Inventory() {
  const { selectedBrands, stockCount, setStockCount, prices } =
    useOutletContext();
  const [activeSection, setActiveSection] = useState("cylinders");

  const updateStock = (id, productType, cylinderType, value) => {
    const newValue = parseFloat(value);

    setStockCount((prev) => ({
      ...prev,
      [productType]: {
        ...(prev[productType] || {}),
        [id]:
          productType === "cylinder"
            ? { ...(prev[productType]?.[id] || {}), [cylinderType]: newValue }
            : newValue,
      },
    }));
  };

  return (
    <main className={styles.inventoryContainer}>
      <section className={styles.secondaryNavbar} id="secondary-navbar">
        <div className={styles.wrapper}>
          <ul className={styles.secondaryNavList}>
            <li className={styles.secondaryNavItems}>
              <a
                href="#cylinders"
                className={`${styles.secondaryNavLink} ${
                  activeSection === "cylinders" ? styles.active : ""
                }`}
                onClick={() => setActiveSection("cylinders")}
              >
                Cylinders
              </a>
            </li>
            <li className={styles.secondaryNavItems}>
              <a
                href="#regulators"
                className={`${styles.secondaryNavLink} ${
                  activeSection === "regulators" ? styles.active : ""
                }`}
                onClick={() => setActiveSection("regulators")}
              >
                Regulators
              </a>
            </li>
            <li className={styles.secondaryNavItems}>
              <a
                href="#stoves"
                className={`${styles.secondaryNavLink} ${
                  activeSection === "stoves" ? styles.active : ""
                }`}
                onClick={() => setActiveSection("stoves")}
              >
                Stoves
              </a>
            </li>
          </ul>
          <ul className={styles.secondaryNavList}>
            <li className={styles.secondaryNavItems}>
              <a href="/empty-cylinders" className={styles.secondaryNavLink}>
                Empty Cylinders
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className={styles.wrapper}>
        {activeSection === "cylinders" && (
          <section id="cylinders" className={styles.section}>
            <h1 className={styles.header}>Cylinders</h1>
            <div className={styles.grid}>
              {selectedBrands.length > 0 ? (
                allBrands
                  .filter((brand) => selectedBrands.includes(brand.id))
                  .map((brand) =>
                    brand.cylinders.map((cylinder) => (
                      <Card
                        key={`${brand.id}-${cylinder.type}`}
                        id={brand.id}
                        name={brand.name}
                        type={cylinder.type}
                        cardType={"cylinder"}
                        picture={cylinder.image}
                        price={
                          prices?.cylinder?.[brand.id]?.[cylinder.type] ??
                          brand.price
                        }
                        stock={
                          stockCount?.cylinder?.[brand.id]?.[cylinder.type] ??
                          brand.stock
                        }
                        updateStock={updateStock}
                      />
                    ))
                  )
              ) : (
                <p className={styles.noBrands}>No brands selected</p>
              )}
            </div>
          </section>
        )}

        {activeSection === "regulators" && (
          <section id="regulators" className={styles.section}>
            <h1 className={styles.header}>Regulators</h1>
            <div className={styles.grid}>
              {regulators.map((regulator) => (
                <Card
                  key={`regulator-${regulator.id}`}
                  id={regulator.id}
                  name={regulator.name}
                  cardType={"regulator"}
                  picture={regulator.image}
                  price={prices?.regulator?.[regulator.id] ?? regulator.price}
                  stock={
                    stockCount?.regulator?.[regulator.id] ?? regulator.stock
                  }
                  updateStock={updateStock}
                />
              ))}
            </div>
          </section>
        )}

        {activeSection === "stoves" && (
          <section id="stoves" className={styles.section}>
            <h1 className={styles.header}>Stoves</h1>
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
        )}
      </div>
    </main>
  );
}

export default Inventory;
