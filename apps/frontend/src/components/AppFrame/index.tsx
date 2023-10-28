import { ReactNode } from "react";
import { Avatar, Dropdown, Layout, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { useGetUser } from "@/hooks/useGetUser";
import Menu from "../Menu";

const { Header, Content } = Layout;

type Props = {
  title: string;
  children: ReactNode;
};

const items: MenuProps["items"] = [
  {
    key: "profile",
    label: <Link to="/profile">Profile</Link>,
  },
  {
    key: "logout",
    label: <Link to="/logout">Log out</Link>,
  },
];

const AppFrame = ({ title, children }: Props) => {
  const { data: user } = useGetUser();

  return (
    <Layout>
      <Header className="flex items-center p-0">
        <Menu />
        <div className="bg-white pr-4">
          <Dropdown menu={{ items }}>
            <Avatar className="cursor-pointer">
              {user?.username.charAt(0).toUpperCase()}
            </Avatar>
          </Dropdown>
        </div>
      </Header>
      <Content>
        <div className="max-h-screen p-8">
          <h3 className="mb-8">{title}</h3>
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default AppFrame;
