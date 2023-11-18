import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { IToken } from "@/interfaces/users";
import authService from "@/services/auth";
import tokenHelper from "@/helper/token";

export function useVerifyToken(
  token: string | null,
  options?: UseQueryOptions<IToken | null>
) {
  return useQuery<IToken | null>(
    ["verifyToken"],
    () => {
      if (!token) return null;
      if (!tokenHelper.isValidExpiration()) return null;
      return authService.verify(token);
    },
    options
  );
}
