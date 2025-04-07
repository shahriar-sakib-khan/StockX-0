import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";
import './index.css';
import { UserProvider } from "./components/Login/UserContext";  // Import UserContext

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </UserProvider>
);