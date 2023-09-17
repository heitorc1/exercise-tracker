import React from "react";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { Link } from "react-router-dom";
import PageHeader from "../../PageHeader/index";

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <PageHeader title="Login" />
      <Row justify="center" style={{ marginTop: "16px" }}>
        <Col>
          <Form
            onFinish={onSubmit}
            style={{ maxWidth: "600px" }}
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please type your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please type your password!" },
              ]}
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
        </Col>
      </Row>
    </>
  );
};

export default Login;
