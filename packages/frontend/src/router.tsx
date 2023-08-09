import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
