import { ReactNode } from "react";
import PageHeader from "../PageHeader";

type Props = {
  title: string;
  children: ReactNode;
};

const LoginFrame = ({ title, children }: Props) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="border-black bg-slate-50 rounded-md shadow-lg w-1/3 p-16">
        <PageHeader title={title} />
        {children}
      </div>
    </div>
  );
};

export default LoginFrame;
