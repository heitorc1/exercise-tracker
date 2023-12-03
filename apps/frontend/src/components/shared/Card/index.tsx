import { Card as AntdCard } from "antd";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  actions?: ReactNode[];
};

const Card = ({ title, children, actions }: Props) => {
  return (
    <AntdCard
      title={title}
      bordered={false}
      className="w-full max-w-xl"
      actions={actions}
    >
      {children}
    </AntdCard>
  );
};

export default Card;
