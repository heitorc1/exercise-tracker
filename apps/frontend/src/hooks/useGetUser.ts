import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { GetUserResponse } from "@/interfaces/users";
import authService from "@/services/auth";

export function useGetUser(options?: UseQueryOptions<GetUserResponse>) {
  return useQuery<GetUserResponse>(
    ["user"],
    () => authService.getUser(),
    options
  );
}
