import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  Logout,
  Profile,
  Register,
  Recovery,
  Dashboard,
  Statistics,
  Shop,
  Selection,
  LpgCommunity,
  Initialization,
  Inventory,
  EmptyCylinders,
  ShopSelection,
  Exchange,
  Receipts,
  ExchangeHistory,
} from "../components";
import Layout from "./Layout";
// import ErrorPage from "./ErrorPage";
// import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      { path: "profile", element: <Profile /> },
      { path: "logout", element: <Logout /> },
      { path: "register", element: <Register /> },
      { path: "Recovery", element: <Recovery /> },
      { path: "initialization", element: <Initialization /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "statistics", element: <Statistics /> },
      { path: "shop", element: <Shop /> },
      { path: "selection", element: <Selection /> },
      { path: "inventory", element: <Inventory /> },
      { path: "lpg-community", element: <LpgCommunity /> },
      { path: "empty-cylinders", element: <EmptyCylinders /> },
      { path: "shop-selection", element: <ShopSelection /> },
      { path: "exchange", element: <Exchange /> },
      { path: "receipts", element: <Receipts /> },
      { path: "exchange-history", element: <ExchangeHistory /> },
    ],
  },
  // {
  //   element: <PrivateRoutes />,
  //   children: [
  //     //any routes that requires a login or privacy
  //     //ideally all the pages in this project will be here
  //   ]
  // }
]);

export default router;
