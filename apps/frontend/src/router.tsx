import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import { getUser } from "./helper/user";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Exercises from "./Pages/Exercises";

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
  const user = await getUser();
  if (user) {
    return redirect("/dashboard");
  }
  return null;
}

async function protectedLoader() {
  const user = await getUser();
  if (user) {
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
