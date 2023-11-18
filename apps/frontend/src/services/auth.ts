import api from "@/api";
import tokenHelper from "@/helper/token";
import { ILogin } from "@/interfaces/login";
import { IToken, IUser } from "@/interfaces/users";

class AuthService {
  public async login(data: ILogin): Promise<IUser | null> {
    const response = await api.post<string>("/auth/login", data);
    const token = response.data;
    tokenHelper.token = token;
    api.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return this.getUser();
  }

  public logout(): null {
    api.instance.defaults.headers.common["Authorization"] = undefined;
    tokenHelper.clearToken();
    return null;
  }

  public async verify(token: string | null): Promise<IToken> {
    const response = await api.post<IToken>("/auth/verify", { token });
    return response.data;
  }

  public async getUser(): Promise<IUser | null> {
    const token = tokenHelper.token;
    if (!token) {
      return this.logout();
    }

    return this.verify(token);
  }
}

const authService = new AuthService();
export default authService;
