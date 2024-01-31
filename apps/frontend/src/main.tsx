import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import ProtectedRouter from "./components/Pages/ProtectedRouter";
import Dashboard from "./components/Pages/Dashboard";
import Exercises from "./components/Pages/Exercises";
import Profile from "./components/Pages/Profile";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
        errorElement: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
        errorElement: <Register />,
      },
      {
        element: <ProtectedRouter />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/exercises",
            element: <Exercises />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
