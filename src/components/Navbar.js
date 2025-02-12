import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ background: 'lightgray', marginBottom: '1rem'}}>
      <h2>StockX</h2>
      <ul>
        <li>
          <NavLink to="/inventory">Inventory</NavLink>
        </li>
        <li>
          <NavLink to="/exchange">Exchange</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;