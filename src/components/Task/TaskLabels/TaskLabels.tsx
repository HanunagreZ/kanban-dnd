const TaskLabels = () => {
  return (
    <div className="flex gap-[4px]">
      <span className="text-textGreen text-[8px] font-bold leading-[12px] py-[2px] px-[4px] rounded-[4px] bg-backgroundGreen w-fit font-manrope">
        ПОД ПРИСМОТРОМ
      </span>
      <span className="text-textRed text-[8px] font-bold leading-[12px] py-[2px] px-[4px] rounded-[4px] bg-backgroundRed w-fit font-manrope">
        СРОЧНО
      </span>
      <span className="text-textOrange text-[8px] font-bold leading-[12px] py-[2px] px-[4px] rounded-[4px] bg-backgroundOrange w-fit font-manrope">
        УТОЧНЕНИЯ
      </span>
      <span className="text-secondaryGray400 text-[10px] font-medium leading-[12px] py-[2px] px-[4px] font-manrope">
        +5
      </span>
    </div>
  );
};

export default TaskLabels;