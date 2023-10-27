import { IUser } from "@/interfaces/users";
import authService from "@/services/auth";

export async function getUser() {
  const token = localStorage.getItem("token");
  let user: IUser | null = null;
  if (token) {
    user = (await authService.getUser(token)).data;
  }
  return user;
}
