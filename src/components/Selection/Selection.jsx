import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import allBrands from '../../assets/sorted-list-of-brands';
import Card from './Card';
import styles from './Selection.module.css';

function Selection() {
  const { selectedBrands, setSelectedBrands } = useOutletContext();
  const navigate = useNavigate();

  const toggleBrand = (id) => {
    setSelectedBrands((prev) =>
      prev.includes(id)
       ? prev.filter(brand => brand !== id)
       : [...prev, id]
    )
  }

  const toggleSelect = () => {
    if(selectedBrands.length === allBrands.length)
      setSelectedBrands([]);
    else
      setSelectedBrands(allBrands.map(brand => brand.id));
  }

  const handleSubmit = () => {
    navigate("/inventory");
  }

  return (
    <>
      <div className={styles.titleSection}>
        <div className={styles.titleSubmit}>
          <h2 className={styles.title}>Selection Page</h2>
          <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
        </div>
        <div className={styles.selectCount}>
          <button className={styles.selectAllBtn} onClick={toggleSelect}>
            {selectedBrands.length === allBrands.length ? 'Deselect All' : 'Select All'}
          </button>
          {/* button functionality still not added */}
          <span className={styles.counter}>Selected: {selectedBrands.length} / {allBrands.length}</span>
        </div>
      </div>
      <ul className={styles.listContainer}>
        {allBrands.map((brand => (
          <Card 
            key={brand.id}
            id={brand.id}
            name={brand.name}
            logo={brand.logo}
            isSelected={selectedBrands.includes(brand.id)}
            onSelect={() => toggleBrand(brand.id)}
          />
        )))}
      </ul>
      {/* <div className={styles.submit}>
        <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
      </div> */}
    </>
  );
}

export default Selection;