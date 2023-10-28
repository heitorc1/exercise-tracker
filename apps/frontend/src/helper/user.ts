import { IToken } from "@/interfaces/users";
import authService from "@/services/auth";

export async function getUser() {
  const user = localStorage.getItem("userInfo");

  if (!user) {
    return authService.logout();
  }

  try {
    return JSON.parse(user) as IToken;
  } catch {
    return authService.logout();
  }
}
