import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Exercises from "./Pages/Exercises";
import authService from "./services/auth";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
        loader: redirectToDashboard,
        errorElement: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
        loader: redirectToDashboard,
        errorElement: <Register />,
      },
      {
        path: "/logout",
        loader: logout,
      },
      {
        loader: protectedLoader,
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

async function redirectToDashboard() {
  const user = await authService.getUser();
  if (user) {
    return redirect("/dashboard");
  }
  return null;
}

async function protectedLoader() {
  const user = await authService.getUser();
  if (user) {
    return user;
  }
  return redirect("/");
}

function logout() {
  authService.logout();
  return redirect("/");
}

export default router;
