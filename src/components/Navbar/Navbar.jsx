import { useState } from "react";
import { NavLink, useLocation, useNavigate} from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isSpecialPage = (location.pathname === "/") || (location.pathname === "/register") || (location.pathname === "/recovery");

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
          <span className={`${styles.logo} ${isSpecialPage ? styles.specialLogo : ""}`  }> <button className={styles.header} onClick={ (e)=>{
            e.preventDefault();
            navigate('/dashboard');
          }} >Stock-X</button>
          </span>
        </a>
        {!isSpecialPage && false && (
          <>
            <div className={styles.hamburger} onClick={toggleMenu}>
            {/* &#9776;          &#x274C;       &#10005; */}
              <span className={menuOpen ? styles.menuOpen : styles.menu}>{!menuOpen ? "☰" : "✖"}</span>
            </div>
            <nav className={`${styles.navbar} ${menuOpen ? styles.open : ""}`}>
              <ul className={styles.primaryNavItems}>
                {renderNavLink("/dashboard", "Dashboard")}
                {renderNavLink("/shop", "Shop")}
                {renderNavLink("/selection", "Selection")}
                {renderNavLink("/inventory", "Inventory")}
                {renderNavLink("/exchange", "Exchange")}
                {renderNavLink("/exchange-history", "History")}
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