import { get } from "../api";

class UserService {
  public async getUsers() {
    return get("/user");
  }
}

const userService = new UserService();
export default userService;
