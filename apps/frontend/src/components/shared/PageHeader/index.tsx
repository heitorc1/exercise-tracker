type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  return (
    <div className="flex flex-row justify-center mb-8">
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
};

export default PageHeader;
