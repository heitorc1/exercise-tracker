import { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dateFormatter } from "@/helper/dateFormatter";
import { IExercise } from "@/interfaces/exercises";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

type ExerciseCardProps = {
  exercise: IExercise;
  setExercises: Dispatch<SetStateAction<IExercise[]>>;
};

function ExerciseCard({ exercise, setExercises }: ExerciseCardProps) {
  return (
    <Card
      key={exercise.id}
      className="w-64 h-80 p-2 flex flex-col justify-between"
    >
      <CardHeader>
        <CardTitle>{exercise.description}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>{dateFormatter(exercise.date)}</div>
        <div>Duration: {exercise.duration} minutes</div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between px-2">
          <EditModal exercise={exercise} setExercises={setExercises} />
          <DeleteModal exercise={exercise} setExercises={setExercises} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default ExerciseCard;
