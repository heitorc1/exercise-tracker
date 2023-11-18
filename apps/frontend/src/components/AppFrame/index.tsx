import { ReactNode, useMemo } from "react";
import { Avatar, Dropdown, Layout, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Menu from "../Menu";

const { Header, Content } = Layout;

type Props = {
  title: string;
  children: ReactNode;
};

const AppFrame = ({ title, children }: Props) => {
  const { user, logout } = useAuth();

  const items: MenuProps["items"] = useMemo(
    () => [
      {
        key: "profile",
        label: <Link to="/profile">Profile</Link>,
      },
      {
        key: "logout",
        label: <span onClick={logout}>Log out</span>,
      },
    ],
    [logout]
  );

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
