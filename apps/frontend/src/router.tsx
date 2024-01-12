import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Dashboard from "./components/Pages/Dashboard";
import Profile from "./components/Pages/Profile";
import Exercises from "./components/Pages/Exercises";
import ProtectedRouter from "./components/Pages/ProtectedRouter";
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
  const token = tokenHelper.getToken();
  if (token) {
    return redirect("dashboard");
  }
  return null;
}

export default router;
