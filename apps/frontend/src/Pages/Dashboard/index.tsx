import AppFrame from "@/components/AppFrame";
import { useGetUsers } from "@/hooks/useGetUsers";

const Dashboard = () => {
  const { data: users, isError, isLoading } = useGetUsers();

  if (isError) {
    return <h3>Nothing to show</h3>;
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <AppFrame title="Users">
      {users.data.map((user, index) => (
        <ul style={{ marginBottom: 16 }} key={user.id}>
          User {index}
          <li>id: {user.id}</li>
          <li>username: {user.username}</li>
          <li>email: {user.email}</li>
        </ul>
      ))}
    </AppFrame>
  );
};

export default Dashboard;
