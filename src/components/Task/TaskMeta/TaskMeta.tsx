import { taskMetaData } from "./taskMetaData";

const TaskMeta = () => {
  return (
    <>
      <div className="flex gap-[4px] h-[16px]">
        <img src="/icons/suitcase.svg" alt="Suitcase icon" />
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-secondaryGray400 text-[12px] font-medium max-w-[134px]">
          Проект с длиннннным названием
        </span>
      </div>

      <span className="text-secondaryGray400 text-[12px] font-medium inline-block h-[17px]">
        SP:
        <span className="text-secondaryGray600 text-[11px] font-semibold inline-block px-[12px] bg-secondaryGray050 rounded-[4px] ml-[3px] h-[17px]">
          123
        </span>
      </span>

      <div className="flex justify-between">
        {taskMetaData.map((item) => (
          <div className="flex gap-[3px] h-[14px] items-center" key={item.id}>
            <img src={item.imgSrc} alt={item.imgAlt} />
            <span className="text-secondaryGray400 text-[11px] font-medium leading-[12px] font-helvetica">
              {item.meta}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskMeta;
