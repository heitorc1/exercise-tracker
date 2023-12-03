import { Typography } from "antd";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  errorMessage?: string;
};

const { Text } = Typography;

const FormInput = ({ title, children, errorMessage }: Props) => {
  return (
    <div className="mb-4">
      <Text>{title}</Text>
      {children}
      <Text type="danger">{errorMessage}</Text>
    </div>
  );
};

export default FormInput;
