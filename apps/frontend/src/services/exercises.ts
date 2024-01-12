import { Observable, map } from "rxjs";
import api from "@/api";
import { IExercise } from "@/interfaces/exercises";
import { Response } from "@/interfaces";

class ExerciseService {
  public getExerciseList(): Observable<IExercise[]> {
    return api
      .get<Response<IExercise[]>>("/exercise")
      .pipe(map((res) => res.data));
  }
}

const exerciseService = new ExerciseService();
export default exerciseService;
