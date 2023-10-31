import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AppFrame from "@/components/AppFrame";
import Card from "@/components/Card";
import CardGroup from "@/components/CardGroup";
import { useExerciseList } from "@/hooks/useExerciseList";
import { dateFormatter } from "@/helper/dateFormatter";

const Exercises = () => {
  const { isLoading, isError, data: exercises } = useExerciseList();

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
        {exercises?.data.map((exercise) => (
          <Card title={dateFormatter(exercise.date)} actions={actions}>
            Duration: {exercise.duration} minutes
          </Card>
        ))}
      </CardGroup>
    </AppFrame>
  );
};

export default Exercises;
