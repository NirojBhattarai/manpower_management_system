interface IProps {
  title: string;
}

const PageHeader = ({ title }: IProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-between items-center text-text-500 typo-mid-bd-reg">
      <span className="font-bold">{title}</span>
    </div>
  );
};

export default PageHeader;
