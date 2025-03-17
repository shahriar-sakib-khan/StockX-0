import { useState } from "react";
import { NavLink, useLocation} from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const isSpecialPage = false;
  //(location.pathname === "/login") || (location.pathname === "/register") || (location.pathname === "/recovery");

  const handleNavClick = () => setMenuOpen(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

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
    <div className={styles.navContainer} id="primary-navbar">
      <div className={`${styles.wrapper} ${isSpecialPage ? styles.special : ""}`}>
        <a href="#">
          <span className={`${styles.logo} ${isSpecialPage ? styles.specialLogo : ""}`}>StockX</span>
        </a>
        {!isSpecialPage && (
          <>
            <div className={styles.hamburger} onClick={toggleMenu}>
            {/* &#9776;          &#x274C; */}
              <span className={menuOpen ? styles.menuOpen : styles.menu}>&#9776;</span>
            </div>
            <nav className={`${styles.navbar} ${menuOpen ? styles.open : ""}`}>
              <ul className={styles.primaryNavItems}>
                {renderNavLink("/", "Dashboard")}
                {renderNavLink("/selection", "Selection")}
                {renderNavLink("/inventory", "Inventory")}
                {renderNavLink("/exchange", "Exchange")}
              </ul>
              <ul className={styles.secondaryNavItems}>
                {renderNavLink("/profile", "Profile")}
              </ul>
            </nav>
          </>
          )}
      </div>
    </div>
  )
}

export default Navbar;