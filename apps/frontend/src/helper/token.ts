import { JwtPayload, jwtDecode } from "jwt-decode";
import { IUser } from "@/interfaces/users";

type JwtToken = JwtPayload & { data: IUser };

class Token {
  private _token: string | null = null;

  constructor() {
    this._token = this.getFromLocalStorage();
  }

  public get token() {
    return this._token;
  }

  public set token(data: string | null) {
    if (!data) {
      return;
    }
    window.localStorage.setItem("token", data);
    this._token = data;
  }

  public clearToken() {
    window.localStorage.removeItem("token");
    this._token = null;
  }

  public isValidExpiration(): boolean {
    if (!this._token) {
      return false;
    }
    const decoded = this.decodeToken(this._token);
    return !!decoded;
  }

  private getFromLocalStorage(): string | null {
    const token = window.localStorage.getItem("token");

    if (!token) {
      return null;
    }

    if (this._token && this._token !== token) {
      this._token = token;
    }

    const decoded = this.decodeToken(token);
    if (!decoded) {
      return null;
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
