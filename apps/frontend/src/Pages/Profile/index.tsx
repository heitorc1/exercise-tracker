import { Button, Form, Input } from "antd";
import { useState } from "react";
import AppFrame from "@/components/AppFrame";
import { ICreateUser } from "@/interfaces/users";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const onSubmit = (values: ICreateUser) => {
    console.log(values);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <AppFrame title="Profile">
      <div className="p-4">
        <Form
          onFinish={onSubmit}
          className="max-w-xl"
          layout="vertical"
          disabled={!isEdit}
        >
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
              {isEdit && (
                <>
                  <Button type="text" onClick={handleEdit}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </>
              )}
            </div>
          </Form.Item>
        </Form>
        {!isEdit && (
          <div className="flex flex-row justify-end max-w-xl">
            <Button type="primary" onClick={handleEdit}>
              Edit
            </Button>
          </div>
        )}
      </div>
    </AppFrame>
  );
};

export default Profile;
