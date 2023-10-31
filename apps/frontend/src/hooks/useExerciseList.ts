import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { GetExerciseListResponse } from "@/interfaces/exercises";
import exerciseService from "@/services/exercises";

export function useExerciseList(
  options?: UseQueryOptions<GetExerciseListResponse>
) {
  return useQuery<GetExerciseListResponse>(
    ["exercises"],
    () => exerciseService.getExerciseList(),
    options
  );
}
