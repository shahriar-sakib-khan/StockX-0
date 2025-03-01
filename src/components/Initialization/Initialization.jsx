import { useOutletContext, useNavigate } from "react-router-dom";
import allBrands from "../../assets/list_of_brands";
import styles from './Initialization.module.css';

function Initialization() {
  const { selectedBrands, stockCount, setStockCount, prices, setPrices } = useOutletContext();
  const navigate = useNavigate();

  const handleChange = (id, type, value, setter) => {
    const newValue = parseInt(value);

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
                  <h3>{brand.name}</h3>
                  <img src={brand.logo} alt={brand.name} className={styles.brandLogo} />
                  {brand.cylinders.map((cylinder) => (
                    <div key={cylinder.type} className={styles.cylinderSection}>
                      <img src={cylinder.image} alt={cylinder.type} className={styles.cylinderImage} />
                      <label>
                        {cylinder.type} Cylinder Price:
                        <input 
                          type="number" 
                          value={prices[brand.id]?.[cylinder.type] || ""}
                          placeholder="Enter Price"
                          onChange={(e) => handleChange(brand.id, cylinder.type, e.target.value, setPrices)}
                          min="0"
                          required
                        />
                      </label>
                      <label>
                        {cylinder.type} Cylinder Stock:
                        <input 
                          type="number"
                          value={stockCount[brand.id]?.[cylinder.type] || ""} 
                          placeholder="Enter Stock Amount"
                          onChange={(e) => handleChange(brand.id, cylinder.type, e.target.value, setStockCount)}
                          min="0"
                          required
                        />
                      </label>
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