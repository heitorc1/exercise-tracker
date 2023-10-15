import React from "react";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { Link, redirect, useNavigate } from "react-router-dom";
import PageHeader from "../../PageHeader/index";
import { useMutation } from "@tanstack/react-query";
import loginService from "../../../services/login";
import { ILogin } from "../../../interfaces/login";
import { toast } from "react-toastify";
import api from "../../../api";

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const mutation = useMutation(
    (data: ILogin) => {
      return loginService.login(data);
    },
    {
      onSuccess: (data) => {
        toast.success("User logged in");
        api.instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data}`;
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
