import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Register from "./components/Pages/Register";
import Login from "./components/Pages/Login";
import Dashboard from "./components/Pages/Dashboard";
import Profile from "./components/Pages/Profile";
import authService from "./services/auth";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
        loader: redirectToDashboard,
      },
      {
        path: "/register",
        element: <Register />,
        loader: redirectToDashboard,
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
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

async function redirectToDashboard() {
  const token = localStorage.getItem("token");
  if (token) {
    await authService.getUser(token);
    return redirect("/dashboard");
  }
  return null;
}

async function protectedLoader() {
  const token = localStorage.getItem("token");
  if (token) {
    const user = await authService.getUser(token);
    return user;
  }
  return redirect("/");
}

async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  return redirect("/");
}

export default router;
