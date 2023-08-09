import { Button, Form, Input, Space } from "antd";
import { Link } from "react-router-dom";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const Register = () => {
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
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please type your email!" }]}
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

      <Form.Item<FieldType>
        label="Confirm your password"
        name="confirmPassword"
        rules={[{ required: true, message: "Please confirm your password!" }]}
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
