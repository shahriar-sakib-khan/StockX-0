import { useOutletContext, useNavigate } from "react-router-dom";
import allBrands from "../../assets/list_of_brands";
import styles from './Initialization.module.css';

function Initialization() {
  const { selectedBrands, stockCount, setStockCount, prices, setPrices } = useOutletContext();
  const navigate = useNavigate();

  const handleChange = (id, type, value, setter) => {
    const newValue = parseFloat(value);

    setter((prev) => ({
      ...prev,
      [id]: { 
        ...(prev[id] || {} ),
        [type]: newValue,
      },
    }));
  };

  const handleSubmit = () => {
    navigate("/inventory");
  }

  return (
    <>
      <div className={styles.initializationContainer}>
        <h2>Initialization</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {selectedBrands.map((id) => {
            const brand = allBrands.find(b => b.id === id);

            return (
              brand && (
                <div key={brand.id} className={styles.brandSection}>
                  <img src={brand.logo} alt={brand.name} className={styles.brandLogo} />
                  <h3>{brand.name}</h3>
                  {brand.cylinders.map((cylinder) => (
                    <div key={cylinder.type} className={styles.cylinderSection}>
                      {/* <img src={cylinder.image} alt={cylinder.type} className={styles.cylinderImage} /> */}
                        <h4 className={styles[`type-${cylinder.type}`]}>{cylinder.type}</h4>
                        <div className={styles.Input}>
                          <input
                            type="number"
                            value={prices[brand.id]?.[cylinder.type] || ""}
                            onChange={(e) => handleChange(brand.id, cylinder.type, e.target.value, setPrices)}
                            min="0"
                            required
                            />
                            <label>Price:</label>
                        </div>
                        <div className={styles.Input}>
                          <input
                            type="number"
                            value={stockCount[brand.id]?.[cylinder.type] || ""}
                            onChange={(e) => handleChange(brand.id, cylinder.type, e.target.value, setStockCount)}
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
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <button className={styles.button} onClick={() => navigate(-1)}>Go Back</button>
            <button className={styles.button} onClick={handleSubmit}>Done</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Initialization;