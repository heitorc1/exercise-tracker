import { BehaviorSubject, distinctUntilChanged } from "rxjs";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { IUser } from "@/interfaces/users";

type JwtToken = JwtPayload & { data: IUser };

class Token {
  private token$ = new BehaviorSubject<string | null>(null);

  constructor() {
    this.token$.next(window.localStorage.getItem("token"));
  }

  public getToken() {
    return this.token$.pipe(distinctUntilChanged());
  }

  public setToken(data: string) {
    window.localStorage.setItem("token", data);
    this.token$.next(data);
    return this.getToken();
  }

  public clearToken() {
    window.localStorage.removeItem("token");
    this.token$.next(null);
  }

  private decodeToken(token: string): JwtToken | null {
    const decoded = jwtDecode<JwtToken>(token);
    if (decoded.exp && decoded.exp < new Date().getTime()) {
      return null;
    }
    return decoded;
  }
}

const tokenHelper = new Token();
export default tokenHelper;
