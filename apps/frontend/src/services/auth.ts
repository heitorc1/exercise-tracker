import api from "@/api";
import { ILogin } from "@/interfaces/login";
import { IUser } from "@/interfaces/users";

class AuthService {
  public async login(data: ILogin) {
    const response = await api.post<string>("/auth/login", data);

    const token = response.data;
    if (token) {
      localStorage.setItem("token", token);
      api.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  public async logout() {
    localStorage.removeItem("token");
  }

  public async getUser(token: string) {
    return api.post<IUser>("/auth/verify", { token });
  }
}

const authService = new AuthService();
export default authService;
