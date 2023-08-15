import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import { GetUserResponse } from "../interfaces/users";

export function useGetUsers(options?: UseQueryOptions<GetUserResponse>) {
  return useQuery<GetUserResponse>(
    ["user"],
    () => userService.getUsers(),
    options
  );
}
