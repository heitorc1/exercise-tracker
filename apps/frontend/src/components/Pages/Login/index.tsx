import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoginFrame from "@/components/LoginFrame";
import { ILogin } from "@/interfaces/login";
import authService from "@/services/auth";

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const mutation = useMutation(
    (data: ILogin) => {
      return authService.login(data);
    },
    {
      onSuccess: () => {
        toast.success("User logged in");
        navigate("/dashboard");
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
