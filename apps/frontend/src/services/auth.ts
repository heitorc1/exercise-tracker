import api from "@/api";
import { ILogin } from "@/interfaces/login";
import { IToken, IUser } from "@/interfaces/users";

class AuthService {
  public async login(data: ILogin) {
    const response = await api.post<string>("/auth/login", data);
    const token = response.data;

    if (token) {
      localStorage.setItem("token", token);
      api.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await this.getUser();
    }
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    api.instance.defaults.headers.common["Authorization"] = undefined;
  }

  public async verify(token: string) {
    const response = await api.post<IToken>("/auth/verify", { token });
    return response.data;
  }

  public async getUser(): Promise<IUser | void> {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      try {
        const token: IToken = JSON.parse(storedUser);
        if (token.exp < Date.now()) {
          return token;
        }
      } catch (err) {
        return this.logout();
      }
    }

    const token = localStorage.getItem("token");
    if (token) {
      const user = await this.verify(token);

      if (user) {
        if (user.exp < Date.now()) {
          return this.logout();
        }
        localStorage.setItem("userInfo", JSON.stringify(user));
        return user;
      }
    }
  }
}

const authService = new AuthService();
export default authService;
