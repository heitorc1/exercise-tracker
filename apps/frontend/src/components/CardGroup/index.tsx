import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CardGroup = ({ children }: Props) => {
  return (
    <div className="flex lg:flex-row flex-col gap-4 lg:flex-wrap">
      {children}
    </div>
  );
};

export default CardGroup;
