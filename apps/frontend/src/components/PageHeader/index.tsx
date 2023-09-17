import React from "react";
import { Row } from "antd";
import { Typography } from "antd";

type Props = {
  title: string;
};

const { Title } = Typography;

const PageHeader = ({ title }: Props) => {
  return (
    <Row justify="center">
      <Title level={2}>{title}</Title>
    </Row>
  );
};

export default PageHeader;
