import { useState } from "react";
import { NavLink, useLocation} from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const isSpecialPage = (location.pathname === "/") || (location.pathname === "/initialization");

  const handleNavClick = () => setMenuOpen(false);

  const renderNavLink = (path, label) => (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
        onClick={handleNavClick}
      >
        {label}
      </NavLink>
    </li>
  );
  
  return (
    <nav className={isSpecialPage ? styles.specialNavbar : styles.navbar}>
      <div className={isSpecialPage ? styles.specialLogo : styles.logo}>StockX</div>
      <div>
        {!isSpecialPage && (
          <>
            <div className={styles.menu} onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className={menuOpen ? styles.open : styles.notOpen}>
              {/* <ul className={styles.navList}> */}
              {renderNavLink("/", "Selection")}
              {renderNavLink("/initialization", "Initialization")}
              {renderNavLink("/inventory", "Inventory")}
              {renderNavLink("/exchange", "Exchange")}
              {renderNavLink("/profile", "Profile")}
            </ul>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;