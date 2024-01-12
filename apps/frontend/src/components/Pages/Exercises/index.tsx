import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import AppFrame from "@/components/shared/AppFrame";
import Card from "@/components/shared/Card";
import CardGroup from "@/components/shared/CardGroup";
import { dateFormatter } from "@/helper/dateFormatter";
import exerciseService from "@/services/exercises";
import { IExercise } from "@/interfaces/exercises";

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

  const actions = [
    <EditOutlined key="edit" onClick={handleEdit} />,
    <DeleteOutlined key="delete" onClick={handleDelete} />,
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching exercises</div>;
  }

  return (
    <AppFrame title="Exercises">
      <CardGroup>
        {exercises?.map((exercise) => (
          <Card
            key={exercise.id}
            title={dateFormatter(exercise.date)}
            actions={actions}
          >
            Duration: {exercise.duration} minutes
          </Card>
        ))}
      </CardGroup>
    </AppFrame>
  );
};

export default Exercises;
