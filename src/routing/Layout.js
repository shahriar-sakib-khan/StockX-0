import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function Layout() {
  return(
    <>
      <Navbar />
      <div id="main">
        <Outlet />
      </div>
    </>
  )
}

export default Layout;