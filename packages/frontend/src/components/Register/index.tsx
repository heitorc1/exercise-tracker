import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Space } from "antd";
import { Link } from "react-router-dom";
import userService from "../../services/users";
import { ICreateUser } from "../../interfaces/users";

type FieldType = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const mutation = useMutation({
    mutationFn: (createUser: ICreateUser) => {
      return userService.createUser(createUser);
    },
  });

  const onSubmit = (values: ICreateUser) => {
    mutation.mutate({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  };

  return (
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
        <Space
          align="center"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Link to="/">
            <Button type="text">Cancel</Button>
          </Link>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Register;
