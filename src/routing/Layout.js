import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { SelectionProvider } from "../components/Selection/SelectionContext";

function Layout() {
  return(
    <SelectionProvider>
      <Navbar />
      <div id="main">
        <Outlet />
      </div>
    </SelectionProvider>
  );
}

export default Layout;