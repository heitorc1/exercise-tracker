import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AppFrame from "@/components/AppFrame";
import Card from "@/components/Card";
import CardGroup from "@/components/CardGroup";

const Exercises = () => {
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

  return (
    <AppFrame title="Exercises">
      <CardGroup>
        <Card title="28/10/2023" actions={actions}>
          Duration: 30 minutes
        </Card>
        <Card title="27/10/2023" actions={actions}>
          Duration: 30 minutes
        </Card>
        <Card title="26/10/2023" actions={actions}>
          Duration: 30 minutes
        </Card>
      </CardGroup>
    </AppFrame>
  );
};

export default Exercises;
