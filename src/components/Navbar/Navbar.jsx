import { useState } from "react";
import { NavLink, useLocation} from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const isSelectionPage = location.pathname === "/";
  
  return (
    <nav className={isSelectionPage ? styles.specialNavbar : styles.navbar}>
      <div className={isSelectionPage ? styles.specialLogo : styles.logo}>StockX</div>
      <div>
        {!isSelectionPage && (
          <>
            <div className={styles.menu} onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className={menuOpen ? styles.open : styles.notOpen}>
            {/* <ul className={styles.navList}> */}
              <li><NavLink to="/" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>Selection</NavLink></li>
              <li><NavLink to="/inventory" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>Inventory</NavLink></li>
              <li><NavLink to="/exchange" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>Exchange</NavLink></li>
              <li><NavLink to="/profile" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>Profile</NavLink></li>
            </ul>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;