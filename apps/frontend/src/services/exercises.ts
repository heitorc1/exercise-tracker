import { Observable } from "rxjs";
import api from "@/api";
import { IExercise } from "@/interfaces/exercises";
import { IPaginatedResponse } from "@/interfaces";

class ExerciseService {
  public getExerciseList(
    page: number,
    pageSize: number
  ): Observable<IPaginatedResponse<IExercise>> {
    return api.get<IPaginatedResponse<IExercise>>("/exercise", {
      page,
      pageSize,
    });
  }
}

const exerciseService = new ExerciseService();
export default exerciseService;
