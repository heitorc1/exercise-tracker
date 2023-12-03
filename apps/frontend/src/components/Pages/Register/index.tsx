import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "@/services/users";
import { ICreateUser } from "@/interfaces/users";
import LoginFrame from "@/components/shared/LoginFrame";

const Register = () => {
  const mutation = useMutation(
    (createUser: ICreateUser) => {
      return userService.createUser(createUser);
    },
    {
      onSuccess: () => {
        toast.success("User created successfully");
        redirect("/login");
      },
      onError: () => {
        toast.error("User not created");
      },
    }
  );

  const onSubmit = (values: ICreateUser) => {
    mutation.mutate({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <LoginFrame title="Register">
      <Form onFinish={onSubmit} style={{ maxWidth: "600px" }} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please type your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please type your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please type your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm your password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The password fields must be equals")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div className="flex flex-row justify-center">
            <Link to="/">
              <Button type="text">Cancel</Button>
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

export default Register;
