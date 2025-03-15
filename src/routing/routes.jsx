import { createBrowserRouter } from "react-router-dom";
import { Login,Profile, Register, Dashboard, Selection, Initialization, Inventory, EmptyCylinders, Exchange, Receipts, ExchangeHistory } from '../components';
import Layout from "./Layout";
// import ErrorPage from "./ErrorPage";
// import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'initialization', element: <Initialization /> },
      { path: 'login', element: <Login /> },
      { path: 'profile', element: <Profile /> },
      { path: 'register', element: <Register /> },
      { path: 'selection', element: <Selection /> },
      { path: 'inventory', element: <Inventory /> },  
      { path: 'empty-cylinders', element: <EmptyCylinders /> },
      { path: 'exchange', element: <Exchange /> },
      { path: 'receipts', element: <Receipts /> },
      { path: 'exchange-history', element: <ExchangeHistory /> }
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