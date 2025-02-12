import { NavLink, useLocation} from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation();
  const isSelectionPage = location.pathname === "/";
  
  return (
    <nav className={isSelectionPage ? styles.specialNavbar : styles.navbar}>
      <div className={isSelectionPage ? styles.specialLogo : styles.logo}>StockX</div>
      <div>
        {!isSelectionPage && (
          <ul className={styles.navList}>
            <li><NavLink to="/" className={styles.navItem}>Selection</NavLink></li>
            <li><NavLink to="/inventory" className={styles.navItem}>Inventory</NavLink></li>
            <li><NavLink to="/exchange" className={styles.navItem}>Exchange</NavLink></li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar;