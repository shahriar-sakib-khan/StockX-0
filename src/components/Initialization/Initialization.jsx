import { useOutletContext, useNavigate } from "react-router-dom";
import allBrands from "../../assets/Lists/list_of_brands";
import regulators from "../../assets/Lists/regulator_list";
import stoves from "../../assets/Lists/stove_list";
import Button from "../Button/Button";
import styles from './Initialization.module.css';

function Initialization() {
  const { selectedBrands, stockCount, setStockCount, prices, setPrices } = useOutletContext();
  const navigate = useNavigate();

  const handleChange = (id, productType, cylinderType, value, setter) => {
    const newValue = parseFloat(value);

    setter((prev) => ({
      ...prev,
      [productType]: { 
        ...(prev[productType] || {} ),
        [id]: productType === "cylinder"
          ? { ...(prev[productType]?.[id] || {}), [cylinderType]: newValue }
          : newValue,
      },
    }));
  };

  const handleSubmit = () => {
    navigate("/inventory");
  }

  const handleClearValues = () => {
    setPrices({});
    setStockCount({});
  }

  return (
    <div className={styles.wrapper}>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className={styles.buttons}>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
            {/* <Button onClick={handleClearValues}>Reset</Button> */}
            <Button onClick={handleSubmit}>Done</Button>
          </div>
          <h1 className={styles.heading}>Enter initial prices and stock values</h1>
          <div className={styles.forms}>
            {selectedBrands.map((id) => {
              const brand = allBrands.find(b => b.id === id);
              return (
                  brand && (
                    <div key={brand.id} className={styles.brandSection}>
                      <img src={brand.logo} alt={brand.name} className={styles.brandLogo} />
                      <h2>{brand.name}</h2>
                      {brand.cylinders.map((cylinder) => (
                        <div key={cylinder.type} className={styles.cylinderSection}>
                          {/* <img src={cylinder.image} alt={cylinder.type} className={styles.cylinderImage} /> */}
                            <h3 className={styles[`type-${cylinder.type}`]}>{cylinder.type}</h3>
                            <div className={styles.Input}>
                              <input
                                type="number"
                                value={prices["cylinder"]?.[brand.id]?.[cylinder.type] || ""}
                                onChange={(e) => handleChange(brand.id, "cylinder", cylinder.type, e.target.value, setPrices)}
                                min="0"
                                required
                                />
                                <label>Price:</label>
                            </div>
                            <div className={styles.Input}>
                              <input
                                type="number"
                                value={stockCount["cylinder"]?.[brand.id]?.[cylinder.type] || ""}
                                onChange={(e) => handleChange(brand.id, "cylinder", cylinder.type, e.target.value, setStockCount)}
                                min="0"
                                required
                                />
                                <label>Stock:</label>
                            </div>
                        </div>
                      ))}
                    </div>
                  )
                );
            })}

            
          </div>
          
        </form>
    </div>
  )
}

export default Initialization;