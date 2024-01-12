import {
  SetStateAction,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "@/interfaces/users";
import authService from "@/services/auth";

type Props = {
  children: React.ReactNode;
};

type AuthContextProps = {
  user: IUser | null;
  login: (data: IUser | null) => void;
  logout: () => void;
  setUser: (data: SetStateAction<IUser | null>) => void;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const login = useCallback(
    (data: IUser | null) => {
      if (data) {
        setUser(data);
        navigate("/dashboard");
        authService.setUser(data);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    authService.setUser(null);
    authService.logout();
    setUser(null);
    navigate("/", { replace: true });
  }, [navigate]);

  const value = useMemo(
    () => ({ user, login, logout, setUser }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
