import { createContext, useContext, useState } from "react";
import { IUser } from "@/interfaces/users";
import tokenHelper from "@/helper/token";
import authService from "@/services/auth";

type Props = {
  children: React.ReactNode;
};

export type AuthContextProps = {
  user: IUser | null;
  login: (value: IUser) => void;
  isAuthenticated: boolean;
  logout: () => void;
};

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
} as AuthContextProps);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    authService.setUser(null);
    tokenHelper.clearToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = (user: IUser) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ user, login, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
