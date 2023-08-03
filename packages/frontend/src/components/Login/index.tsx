import { useGetUsers } from "../../hooks/useGetUsers";

const Login = () => {
  const { data: users } = useGetUsers();
  console.log(users?.data);

  return (
    <div className="w-full h-screen">
      {users?.data.map((user) => (
        <div className="flex flex-row gap-6">
          <h1 className="text-xl">ID: {user._id}</h1>
          <h1 className="text-xl">Username: {user.username}</h1>
        </div>
      ))}
    </div>
  );
};

export default Login;
