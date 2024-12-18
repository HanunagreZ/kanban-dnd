interface ICreateColumnButtonProps {
  createNewColumn: () => void;
}

const AddColumnButton = (props: ICreateColumnButtonProps) => {
  const { createNewColumn } = props;

  return (
    <button
      className="h-[42px] w-[150px] min-w-[150px] px-2 flex items-center justify-between cursor-pointer text-[12px] leading-[24px] font-semibold text-secondaryGray400 hover: rounded-md hover:bg-secondaryGray800 ease-in-out duration-300 ml-[6px]"
      onClick={createNewColumn}
    >
      <img src="/icons/plus.svg" alt="Plus icon" />
      Добавить колонку
    </button>
  );
};

export default AddColumnButton;
