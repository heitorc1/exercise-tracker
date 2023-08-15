import { Button, Form, Input, Space } from "antd";
import { Link } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
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
        <Space
          align="center"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Link to="register">
            <Button type="text">Register</Button>
          </Link>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Login;
