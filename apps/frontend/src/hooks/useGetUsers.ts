import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { GetUsersResponse } from "@/interfaces/users";
import userService from "@/services/users";

export function useGetUsers(options?: UseQueryOptions<GetUsersResponse>) {
  return useQuery<GetUsersResponse>(
    ["user"],
    () => userService.getUsers(),
    options
  );
}
