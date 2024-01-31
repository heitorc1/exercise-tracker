import { BehaviorSubject, Observable, map } from "rxjs";
import api from "@/api";
import tokenHelper from "@/helper/token";
import { Response } from "@/interfaces";
import { ILogin } from "@/interfaces/login";
import { IToken, IUser } from "@/interfaces/users";

class AuthService {
  private user$ = new BehaviorSubject<IUser | null>(null);

  public login(data: ILogin) {
    return api
      .post<Response<string>>("/auth/login", data)
      .pipe(map((res) => res.data));
  }

  public setUser(data: IUser | null) {
    this.user$.next(data);
  }

  public getUser(): Observable<IUser | null> {
    return this.user$;
  }

  public logout(): null {
    tokenHelper.clearToken();
    return null;
  }

  public verify(token: string | null): Observable<IToken> {
    return api
      .post<Response<IToken>>("/auth/verify", { token })
      .pipe(map((res) => res.data));
  }
}

const authService = new AuthService();
export default authService;
