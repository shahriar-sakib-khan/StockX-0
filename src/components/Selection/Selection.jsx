import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import allBrands from '../../assets/list_of_brands';
import Card from './Card';
import Button from '../Button/Button';
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

  const handleSubmit = (isSubmitDisabled) => {
    if(!isSubmitDisabled)
      navigate("/initialization");
  }

  const isSubmitDisabled = !(selectedBrands.length > 0);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.titleSection}>
          <div className={styles.titleSubmit}>
            <h2 className={styles.title}>Selection Page</h2>
            <Button
              className={styles.submitBtn}
              onClick={() => handleSubmit(isSubmitDisabled)}
              disabled={isSubmitDisabled}
              data-tool-tip={"Select a brand to proceed"}
            >
              Submit
            </Button>
          </div>
          <div className={styles.selectCount}>
            <Button
              onClick={toggleSelect}
            >
              {selectedBrands.length === allBrands.length ? 'Deselect All' : 'Select All'}
            </Button>
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
      </div>
    </>
  );
}

export default Selection;