import { createBrowserRouter } from "react-router-dom";
import { Login, Register, Selection, Inventory, Exchange } from '../components';
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
      { path: 'register', element: <Register /> },
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