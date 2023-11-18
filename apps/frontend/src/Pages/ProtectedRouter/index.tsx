import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import tokenHelper from "@/helper/token";
import { useVerifyToken } from "@/hooks/useVerifyToken";

const ProtectedRouter = () => {
  const { user, setUser } = useAuth();
  const { isLoading, data, error } = useVerifyToken(tokenHelper.token);

  useEffect(() => {
    if (!user && data) {
      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
      });
    }
  }, [data, setUser, user]);

  if (isLoading) {
    return <div>carregando...</div>;
  }

  if (error) {
    <Navigate to="/" replace />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet context={user} />;
};

export default ProtectedRouter;
