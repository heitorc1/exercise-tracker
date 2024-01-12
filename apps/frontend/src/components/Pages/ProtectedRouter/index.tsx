import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import tokenHelper from "@/helper/token";
import authService from "@/services/auth";

const ProtectedRouter = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      return;
    }

    setIsLoading(true);
    const token = tokenHelper.getToken();
    const sub = authService.verify(token).subscribe({
      next: (res) => {
        const loggedUser = {
          id: res.id,
          email: res.email,
          username: res.username,
        };
        authService.setUser(loggedUser);
        setUser(loggedUser);
        setIsLoading(false);
      },
      error: (err) => {
        toast.error(err);
        setIsLoading(false);
      },
    });

    return () => sub.unsubscribe();
  }, [setUser, user]);

  if (isLoading) {
    return <div>carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet context={user} />;
};

export default ProtectedRouter;
