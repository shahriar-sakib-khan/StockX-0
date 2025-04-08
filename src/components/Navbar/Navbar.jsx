import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const noNavbar =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/recovery";

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

  // ☰ = &#9776;
  // ✖

  return (
    <section
      className={`${styles.navContainer} ${noNavbar ? styles.noNavbar : ""}`}
      id="primary-navbar"
    >
      <div className={styles.wrapper}>
        <NavLink to={"./dashboard"} className={styles.logo}>
          StockX
        </NavLink>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span className={menuOpen ? styles.menuOpen : styles.menu}>
            {!menuOpen ? "☰" : "✖"}
          </span>
        </div>
        <nav className={`${styles.navbar} ${menuOpen ? styles.open : ""}`}>
          <ul className={styles.primaryNavItems}>
            {renderNavLink("/dashboard", "Dashboard")}
            {renderNavLink("/shop", "Shop")}
            {renderNavLink("/selection", "Selection")}
            {renderNavLink("/inventory", "Inventory")}
            {renderNavLink("/shop-selection", "Exchange")}
            {renderNavLink("/exchange-history", "History")}
          </ul>
          <ul className={styles.secondaryNavItems}>
            {renderNavLink("/profile", "Profile")}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;
