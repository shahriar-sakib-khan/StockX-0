import { useOutletContext } from "react-router-dom";
import allBrands from "../../assets/Lists/list_of_brands";

function EmptyCylinders() {
  const { EmptyCylinders } = useOutletContext();

  const dummyEmptyList = {
    1: {
      "20mm": 5,
      "22mm": 2,
    },
    2: {
      "22mm": 10,
    },
    5: {
      "20mm": 7,
    },
  };

  const isEmpty =
    !dummyEmptyList ||
    Object.keys(dummyEmptyList).length === 0 ||
    Object.values(dummyEmptyList).every(
      (item) =>
        !item ||
        Object.keys(item).length === 0 ||
        Object.values(item).every((count) => count === 0)
    );

  return (
    <>
      <p>Retrieved Empty Cylinders</p>
      {isEmpty ? (
        <p>No items received.</p>
      ) : (
        <ul>
          {Object.entries(dummyEmptyList).map(([brandId, items]) => {
            return Object.entries(items).map(([itemType, count]) => {
              const brand = allBrands.find(
                (f) => Number(f.id) === Number(brandId)
              );
              // console.log(brand);
              const Name = brand.name || "Unknown";
              return (
                <li key={`${brandId}-${itemType}`}>
                  Brand: {Name} [{itemType}], Count: {count}
                </li>
              );
            });
          })}
        </ul>
      )}
    </>
  );
}

export default EmptyCylinders;
