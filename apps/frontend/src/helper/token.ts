import { BehaviorSubject } from "rxjs";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { IUser } from "@/interfaces/users";

type JwtToken = JwtPayload & { data: IUser };

class Token {
  private token$ = new BehaviorSubject<string>("");

  constructor() {
    this.token$.next(this.getFromLocalStorage());
  }

  public getToken() {
    return this.token$.getValue();
  }

  public setToken(data: string) {
    window.localStorage.setItem("token", data);
    this.token$.next(data);
  }

  public clearToken() {
    window.localStorage.removeItem("token");
    this.token$.next("");
  }

  public isValidExpiration(): boolean {
    if (!this.token$.getValue()) {
      return false;
    }
    const decoded = this.decodeToken(this.token$.getValue());
    return !!decoded;
  }

  private getFromLocalStorage(): string {
    const token = window.localStorage.getItem("token");
    if (!token || token === "null") {
      this.clearToken();
      return "";
    }

    if (this.token$.getValue() && this.token$.getValue() !== token) {
      this.token$.next(token);
    }

    const decoded = this.decodeToken(token);
    if (!decoded) {
      return "";
    }

    return token;
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
