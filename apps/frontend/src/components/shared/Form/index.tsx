import { ReactNode } from "react";

type Props = {
  onSubmit: () => Promise<void>;
  children: ReactNode;
};

const Form = ({ onSubmit, children }: Props) => {
  return (
    <form onSubmit={onSubmit} className="max-w-96">
      {children}
    </form>
  );
};

export default Form;
