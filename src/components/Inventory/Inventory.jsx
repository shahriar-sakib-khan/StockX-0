import { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import regulator_image from "../../assets/images/Regulator.jpg";
import stove_image from "../../assets/images/Stove.jpeg";
import { useUpdateStock } from "../../routing/hooks/useUpdateStock";
import Button from "../Button/Button";
import Card from "./Card";
import styles from "./Inventory.module.css";
import Modal from "./Modal";

function Inventory() {
  const {
    selectedBrands,
    setSelectedBrands,
    regulators,
    setRegulators,
    stoves,
    setStoves,
  } = useOutletContext();

  const location = useLocation();
  const isBuyPage = location.pathname === "/buy";

  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    stock: 0,
  });

  const [activeSection, setActiveSection] = useState("cylinders");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");

  const updateStock = useUpdateStock(
    setSelectedBrands,
    setRegulators,
    setStoves
  );

  const openAddProductModal = (type) => {
    setSelectedProductType(type); // regulator or stove
    setModalType("ADD_PRODUCT");
    setIsModalOpen(true);
  };

  const handleAddProduct = (type, productData) => {
    const image = type === "regulator" ? regulator_image : stove_image;
    const setter = type === "regulator" ? setRegulators : setStoves;

    setter((prevList) => {
      const newId =
        prevList.length > 0
          ? Math.max(...prevList.map((item) => item.id)) + 1
          : 1;

      return [
        ...prevList,
        { ...productData, id: newId, stock: Number(productData.stock), image },
      ];
    });
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
          {!isBuyPage && (
            <ul className={styles.secondaryNavList}>
              <li className={styles.secondaryNavItems}>
                <a href="/empty-cylinders" className={styles.secondaryNavLink}>
                  Empty Cylinders
                </a>
              </li>
            </ul>
          )}
        </div>
      </section>

      <div className={styles.wrapper}>
        {activeSection === "cylinders" && (
          <section id="cylinders" className={styles.section}>
            {/* <h1 className={styles.header}>Cylinders</h1> */}
            <div className={styles.grid}>
              {selectedBrands.length > 0 ? (
                selectedBrands.map((brand) =>
                  brand.cylinders.map((cylinder) => (
                    <Card
                      key={`${brand.id}-${cylinder.type}`}
                      id={brand.id}
                      name={brand.name}
                      type={cylinder.type}
                      cardType={"cylinder"}
                      picture={cylinder.image}
                      price={cylinder.price}
                      stock={cylinder.stock}
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
            {/* <h1 className={styles.header}>Regulators</h1> */}
            <div className={styles.newButtonContainer}>
              {/* <Button onClick={() => setRegulators([])}>Reset List</Button> */}
              <Button
                variant="secondary"
                onClick={() => openAddProductModal("regulator")}
              >
                Add Regulator
              </Button>
            </div>
            <div className={styles.grid}>
              {regulators.map((regulator) => (
                <Card
                  key={`regulator-${regulator.id}`}
                  id={regulator.id}
                  name={regulator.name}
                  type={null}
                  cardType={"regulator"}
                  picture={regulator.image}
                  price={regulator.price}
                  stock={regulator.stock}
                  updateStock={updateStock}
                />
              ))}
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={() => handleAddProduct("regulator", productData)}
              modalType={modalType}
              stock={selectedProductType}
              productData={productData}
              setProductData={setProductData}
            />
          </section>
        )}

        {activeSection === "stoves" && (
          <section id="stoves" className={styles.section}>
            {/* <h1 className={styles.header}>Stoves</h1> */}
            <div className={styles.newButtonContainer}>
              {/* <Button onClick={() => setStoves([])}>Reset List</Button> */}
              <Button
                variant="secondary"
                onClick={() => openAddProductModal("stove")}
              >
                Add Stove
              </Button>
            </div>
            <div className={styles.grid}>
              {stoves.map((stove) => (
                <Card
                  key={`stove-${stove.id}`}
                  id={stove.id}
                  name={stove.name}
                  type={null}
                  cardType={"stove"}
                  picture={stove.image}
                  price={stove.price}
                  stock={stove.stock}
                  updateStock={updateStock}
                />
              ))}
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={() => handleAddProduct("stove", productData)}
              modalType={modalType}
              stock={selectedProductType}
              productData={productData}
              setProductData={setProductData}
            />
          </section>
        )}
      </div>
    </main>
  );
}

export default Inventory;
