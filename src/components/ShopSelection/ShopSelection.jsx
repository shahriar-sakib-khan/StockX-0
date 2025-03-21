import styles from "./ShopSelection.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button.jsx";

function ShopSelection() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h1>Shop Selection</h1>
      <Button onClick={() => navigate("/exchange")}>Next</Button>
    </div>
  );
}

export default ShopSelection;
