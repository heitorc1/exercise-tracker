import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Exercises from "./Pages/Exercises";
import ProtectedRouter from "./Pages/ProtectedRouter";
import tokenHelper from "./helper/token";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
        errorElement: <Login />,
        loader: redirectToDashboard,
      },
      {
        path: "/register",
        element: <Register />,
        errorElement: <Register />,
        loader: redirectToDashboard,
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

function redirectToDashboard() {
  const token = tokenHelper.token;
  if (token) {
    return redirect("dashboard");
  }
  return null;
}

export default router;
