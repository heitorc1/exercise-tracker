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

  public editExercise(exercise: Partial<IExercise>): Observable<IExercise> {
    return api.patch<IExercise>(`/exercise/${exercise.id}`, exercise);
  }

  public deleteExercise(id: string): Observable<void> {
    return api.delete<void>(`/exercise/${id}`);
  }
}

const exerciseService = new ExerciseService();
export default exerciseService;
