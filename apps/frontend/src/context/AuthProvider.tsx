import { createContext, useContext, useEffect, useState } from "react";
import { catchError, distinctUntilChanged, filter, of, switchMap } from "rxjs";
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

  useEffect(() => {
    if (user) {
      return;
    }

    tokenHelper
      .getToken()
      .pipe(
        distinctUntilChanged(),
        filter((token) => !!token),
        switchMap((token) => authService.verify(token)),
        catchError(() => {
          tokenHelper.clearToken();
          return of(null);
        }),
        switchMap((token) => {
          if (token) {
            const userData = {
              id: token.id,
              username: token.username,
              email: token.email,
            };
            authService.setUser(userData);
            return of(userData);
          }
          return of(null);
        })
      )
      .subscribe((token) => {
        if (token) {
          const userData = {
            id: token.id,
            username: token.username,
            email: token.email,
          };
          setUser(userData);
          setIsAuthenticated(true);
        }
      });
  }, [user]);

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
