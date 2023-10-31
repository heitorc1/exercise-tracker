import api from "@/api";
import { IExercise } from "@/interfaces/exercises";

class ExerciseService {
  public async getExerciseList() {
    return api.get<IExercise[]>("/exercise");
  }
}

const exerciseService = new ExerciseService();
export default exerciseService;
