import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
// import { z } from "zod";
import LoginFrame from "@/components/shared/LoginFrame";
import { ILogin } from "@/interfaces/login";
import authService from "@/services/auth";
import { useAuth } from "@/hooks/useAuth";
import { IUser } from "@/interfaces/users";

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const { login } = useAuth();
  // const {
  // register,
  // handleSubmit,
  // watch,
  // formState: { erros },
  // } = useForm<FieldType>();
  const mutation = useMutation(
    async (data: ILogin) => authService.login(data),
    {
      onSuccess: (data: IUser | null) => {
        login(data);
        toast.success("User logged in");
      },
      onError: () => {
        toast.error("Incorrect data provided");
      },
    }
  );

  const onSubmit = (values: ILogin) => {
    mutation.mutate({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <LoginFrame title="Login">
      <Form onFinish={onSubmit} style={{ maxWidth: "600px" }} layout="vertical">
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please type your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please type your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div className="flex flex-row justify-center">
            <Link to="register">
              <Button type="text">Register</Button>
            </Link>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </LoginFrame>
  );
};

export default Login;
