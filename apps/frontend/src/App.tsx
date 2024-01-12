import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import "./app.css";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <AuthProvider>
      <Outlet />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
