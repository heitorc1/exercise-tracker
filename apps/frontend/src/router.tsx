import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./components/Register";
import Login from "./components/Login";

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
    ],
  },
]);

export default router;
