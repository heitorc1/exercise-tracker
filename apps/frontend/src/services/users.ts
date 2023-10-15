import api from "../api";
import { ICreateUser, IUser } from "../interfaces/users";

class UserService {
  public async getUsers() {
    return api.get<IUser[]>("/user");
  }

  public async createUser(data: ICreateUser) {
    return api.post<IUser>("/user", data);
  }
}

const userService = new UserService();
export default userService;
