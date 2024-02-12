import { Observable, map } from "rxjs";
import api from "@/api";
import { IExercise } from "@/interfaces/exercises";
import { IPaginatedResponse, Response } from "@/interfaces";

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

  public addExercise(exercise: Partial<IExercise>): Observable<IExercise> {
    return api
      .post<Response<IExercise>>(`/exercise`, exercise)
      .pipe(map((res) => res.data));
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
