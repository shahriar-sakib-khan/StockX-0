import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Selection from "../components/Selection/Selection";
import Inventory from "../components/Inventory/Inventory";
import Exchange from "../components/Exchange/Exchange";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";
// import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Selection /> },
      { path: 'login', element: <Login /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'exchange', element: <Exchange /> },
    ]

  },
  // {
  //   element: <PrivateRoutes />,
  //   children: [
  //     //any routes that requires a login or privacy
  //     //ideally all the pages in this project will be here
  //   ]
  // }

])

export default router;