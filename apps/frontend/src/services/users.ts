import { Observable, map } from "rxjs";
import api from "@/api";
import { Response } from "@/interfaces";
import { ICreateUser, IUser } from "@/interfaces/users";

class UserService {
  public createUser(data: ICreateUser): Observable<IUser> {
    return api
      .post<Response<IUser>>("/user", data)
      .pipe(map((res) => res.data));
  }
}

const userService = new UserService();
export default userService;
