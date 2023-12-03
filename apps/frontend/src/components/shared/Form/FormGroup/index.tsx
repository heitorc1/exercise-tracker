import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const FormGroup = ({ children }: Props) => {
  return <div className="flex flex-row justify-center mt-8">{children}</div>;
};

export default FormGroup;
