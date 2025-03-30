import { useNavigate, useOutletContext } from "react-router-dom";
import allBrands from "../../assets/Lists/list_of_brands";
import Button from "../Button/Button";
import styles from "./Initialization.module.css";

function Initialization() {
  const { selectedBrands, setSelectedBrands } = useOutletContext();
  const navigate = useNavigate();

  const handleChange = (id, cylinderType, field, value) => {
    const newValue = parseFloat(value) || 0;

    setSelectedBrands((prevBrands) =>
      prevBrands.map((brand) =>
        brand.id === id
          ? {
              ...brand,
              cylinders: brand.cylinders.map((cylinder) =>
                cylinder.type === cylinderType
                  ? { ...cylinder, [field]: newValue }
                  : cylinder
              ),
            }
          : brand
      )
    );
  };

  const handleSubmit = () => {
    navigate("/inventory");
  };

  const handleClearValues = () => {
    allBrands((prevBrands) =>
      prevBrands.map((brand) => ({
        ...brand,
        cylinders: brand.cylinders.map((cylinder) => ({
          ...cylinder,
          stock: 0,
          price: 0,
        })),
      }))
    );
  };

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={styles.buttons}>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
          {/* <Button onClick={handleClearValues}>Reset</Button> */}
          <Button onClick={handleSubmit}>Done</Button>
        </div>
        <h1 className={styles.heading}>
          Enter initial prices and stock values
        </h1>
        <div className={styles.forms}>
          {selectedBrands.map((brand) => {
            return (
              <div key={brand.id} className={styles.brandSection}>
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={styles.brandLogo}
                />
                <h2>{brand.name}</h2>
                {brand.cylinders.map((cylinder) => (
                  <div key={cylinder.type} className={styles.cylinderSection}>
                    <h3 className={styles[`type-${cylinder.type}`]}>
                      {cylinder.type}
                    </h3>
                    <div className={styles.Input}>
                      <input
                        type="number"
                        value={cylinder.price || ""}
                        onChange={(e) =>
                          handleChange(
                            brand.id,
                            cylinder.type,
                            "price",
                            e.target.value
                          )
                        }
                        min="0"
                        required
                      />
                      <label>Price:</label>
                    </div>
                    <div className={styles.Input}>
                      <input
                        type="number"
                        value={cylinder.stock || ""}
                        onChange={(e) =>
                          handleChange(
                            brand.id,
                            cylinder.type,
                            "stock",
                            e.target.value
                          )
                        }
                        min="0"
                        required
                      />
                      <label>Stock:</label>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}

export default Initialization;
