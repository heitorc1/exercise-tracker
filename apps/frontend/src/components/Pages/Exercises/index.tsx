import { useEffect, useState } from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";
import AppFrame from "@/components/shared/AppFrame";
import { dateFormatter } from "@/helper/dateFormatter";
import exerciseService from "@/services/exercises";
import { IExercise } from "@/interfaces/exercises";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Exercises = () => {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    exerciseService.getExerciseList().subscribe({
      next: (res) => {
        setExercises(res);
        setIsLoading(false);
      },
      error: (err) => {
        setIsError(true);
        setIsLoading(false);
        toast.error(err);
      },
    });
  }, []);

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching exercises</div>;
  }

  return (
    <AppFrame title="Exercises">
      <div className="w-full flex flex-wrap gap-8">
        {exercises?.map((exercise) => (
          <Card key={exercise.id} className="p-2">
            <CardHeader className="w-64">
              <CardTitle>{dateFormatter(exercise.date)}</CardTitle>
            </CardHeader>
            <CardContent>Duration: {exercise.duration} minutes</CardContent>
            <CardFooter>
              <div className="flex w-full justify-between px-2">
                <Pencil1Icon
                  onClick={handleEdit}
                  className="h-4 cursor-pointer"
                />
                <TrashIcon
                  onClick={handleDelete}
                  className="h-4 cursor-pointer"
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </AppFrame>
  );
};

export default Exercises;
