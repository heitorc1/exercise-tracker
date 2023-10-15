import React from "react";
import PageHeader from "../../PageHeader";
import { useGetUsers } from "../../../hooks/useGetUsers";

const Dashboard = () => {
  const { data: users, isError, isLoading } = useGetUsers();

  if (isError) {
    return <h3>Nothing to show</h3>;
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <PageHeader title="Dashboard" />
      <h3>Users</h3>
      {users.data.map((user, index) => (
        <ul style={{ marginBottom: 16 }}>
          User {index}
          <li>id: {user.id}</li>
          <li>username: {user.username}</li>
          <li>email: {user.email}</li>
        </ul>
      ))}
    </>
  );
};

export default Dashboard;
