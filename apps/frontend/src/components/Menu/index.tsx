import React, { useEffect, useState } from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu as AntdMenu } from "antd";
import { Link, useLocation } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: <Link to="/dashboard">Home</Link>,
    key: "dashboard",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/profile">Profile</Link>,
    key: "profile",
    icon: <UserOutlined />,
  },
];

const Menu = () => {
  const [current, setCurrent] = useState("home");
  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname.slice(1));
  }, [location.pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="w-full">
      <AntdMenu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default Menu;