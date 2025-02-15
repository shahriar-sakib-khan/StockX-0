import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import allBrands from '../../assets/sorted-list-of-brands';
import Card from './Card';
import styles from './Selection.module.css';

function Selection() {
  const { selectedBrands, toggleBrand } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/inventory");
  }

  return (
    <>
      <div className={styles.titleSection}>
        <h2 className={styles.title}>Selection Page</h2>
        <div>
          <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
          {/* Selection Counter
          Select All Button */}
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