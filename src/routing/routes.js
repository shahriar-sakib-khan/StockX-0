import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Homepage from "./Homepage";
import Inventory from "./Inventory";
import Exchange from "./Exchange";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";
import PrivateRoutes from "./privateroutes";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Homepage /> },
      { path: 'login', element: <Login /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'exchange', element: <Exchange /> },
    ]

  },
  {
    element: <PrivateRoutes />,
    children: [
      //any routes that requires a login or privacy
      //ideally all the pages in this project will be here
    ]
  }

])

export default router;