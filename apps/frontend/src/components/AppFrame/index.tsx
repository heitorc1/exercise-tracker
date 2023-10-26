import React from "react";
import Menu from "../Menu";
import { Avatar, Dropdown, Layout, MenuProps } from "antd";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

type Props = {
  title: string;
  children: React.ReactNode;
};

const items: MenuProps["items"] = [
  {
    key: "logout",
    label: <Link to="/logout">Log out</Link>,
  },
];

const AppFrame = ({ title, children }: Props) => {
  return (
    <Layout>
      <Header className="flex items-center p-0">
        <Menu />
        <div className="bg-white pr-4">
          <Dropdown menu={{ items }}>
            <Avatar className="cursor-pointer">U</Avatar>
          </Dropdown>
        </div>
      </Header>
      <Content>
        <div className="max-h-screen p-8">
          <h3>{title}</h3>
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default AppFrame;
