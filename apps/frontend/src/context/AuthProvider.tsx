import { createContext, useEffect, useState } from "react";
import { switchMap, take } from "rxjs";
import { IUser } from "@/interfaces/users";
import authService from "@/services/auth";
import tokenHelper from "@/helper/token";

type Props = {
  children: React.ReactNode;
};

type AuthContextProps = {
  user: IUser | null;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (user) {
      return;
    }

    login();
  }, [user]);

  const login = () => {
    tokenHelper
      .getToken()
      .pipe(
        take(1),
        switchMap((token) => authService.verify(token))
      )
      .subscribe({
        next: (res) => {
          const userData = {
            id: res.id,
            email: res.email,
            username: res.username,
          };
          authService.setUser(userData);
          setUser(userData);
        },
        error: (err) => {
          console.log(err);
          authService.logout();
        },
      });
  };

  const logout = () => {
    authService.setUser(null);
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
