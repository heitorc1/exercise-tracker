import React from "react";
import { Typography } from "antd";

type Props = {
  title: string;
};

const { Title } = Typography;

const PageHeader = ({ title }: Props) => {
  return (
    <div className="flex flex-row justify-center mb-8">
      <Title level={2}>{title}</Title>
    </div>
  );
};

export default PageHeader;
