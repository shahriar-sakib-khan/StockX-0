import { Link } from "react-router-dom";

function Homepage() {

  return (
    <>
      <p>This is the Homepage</p>
      <Link to='/inventory'>Inventory</Link>
    </>
  );
}

export default Homepage;