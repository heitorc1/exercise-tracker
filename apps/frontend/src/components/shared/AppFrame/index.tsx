import { ReactNode } from "react";
import Menu from "../Menu";

type Props = {
  title: string;
  children: ReactNode;
};

const AppFrame = ({ title, children }: Props) => {
  return (
    <div className="h-screen w-full">
      <div className="bg-blue-950 h-20 flex items-center p-0">
        <Menu />
      </div>
      <div>
        <div className="max-h-screen p-8">
          <h1 className="mb-8 text-2xl font-bold">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppFrame;
