import api from "../api";
import { ILogin } from "../interfaces/login";

class LoginService {
  public async login(data: ILogin) {
    const response = await api.post<string>("/login", data);
    return response?.data;
  }
}

const loginService = new LoginService();
export default loginService;
