import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./components/Pages/Register";
import Login from "./components/Pages/Login";
import Dashboard from "./components/Pages/Dashboard";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
