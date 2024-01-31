import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRouter = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet context={user} />;
};

export default ProtectedRouter;
