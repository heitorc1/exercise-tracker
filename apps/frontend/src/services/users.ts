import { get, post } from "../api";
import { ICreateUser } from "../interfaces/users";

class UserService {
  public async getUsers() {
    return get("/user");
  }

  public async createUser(params: ICreateUser) {
    return post("/user", { params });
  }
}

const userService = new UserService();
export default userService;
