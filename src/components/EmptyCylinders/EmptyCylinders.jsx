import { useOutletContext } from "react-router-dom";
import Button from "../Button/Button";
import Card from "../Inventory/Card";
import styles from "./EmptyCylinders.module.css";

function EmptyCylinders() {
  const { selectedBrands, emptyCylinders, setEmptyCylinders } =
    useOutletContext();

  // console.log("empty cylinders: ");
  // console.log(emptyCylinders);

  // const dummyEmptyList = {
  //   1: {
  //     "20mm": 5,
  //     "22mm": 2,
  //   },
  //   2: {
  //     "22mm": 10,
  //   },
  //   5: {
  //     "20mm": 7,
  //   },
  // };

  const isEmpty =
    !emptyCylinders ||
    Object.keys(emptyCylinders).length === 0 ||
    Object.values(emptyCylinders).every(
      (item) =>
        !item ||
        Object.keys(item).length === 0 ||
        Object.values(item).every((count) => count === 0)
    );

  return (
    <main className={styles.wrapper}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Empty Cylinders List</h1>
        <Button onClick={() => setEmptyCylinders([])}>Reset</Button>
      </div>
      {isEmpty ? (
        <p className={styles.noItems}>No items to see here</p>
      ) : (
        <section className={styles.grid}>
          {Object.entries(emptyCylinders || []).map(([brandId, items]) => {
            return Object.entries(items || []).map(([itemType, count]) => {
              const brand = selectedBrands.find(
                (f) => Number(f.id) === Number(brandId)
              );
              const Price = brand.cylinders.find(
                (c) => c.type === itemType
              ).price;

              const Image = brand.cylinders.find(
                (c) => c.type === itemType
              ).image;
              // console.log(brand);
              return (
                <Card
                  key={`${brandId}-${itemType}`}
                  id={Number(brandId)}
                  name={brand.name || "Unknown"}
                  type={itemType}
                  cardType={"cylinder"}
                  picture={Image}
                  price={Price}
                  stock={count}
                />
              );
            });
          })}
        </section>
      )}
    </main>
  );
}

export default EmptyCylinders;
