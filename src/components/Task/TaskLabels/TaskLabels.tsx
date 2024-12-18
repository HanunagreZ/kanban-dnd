import { Fragment } from "react/jsx-runtime";

import { taskLabelsData } from "./taskLabelsData";

const TaskLabels = () => {
  return (
    <div className="flex gap-[4px]">
      {taskLabelsData.map((item) => (
        <Fragment key={item.id}>
          <span
            className={`${item.textColor} ${item.backgroundColor} text-[8px] font-bold leading-[12px] py-[2px] px-[4px] rounded-[4px] bg-backgroundGreen w-fit font-manrope`}
          >
            {item.label}
          </span>
        </Fragment>
      ))}

      <span className="text-secondaryGray400 text-[10px] font-medium leading-[12px] py-[2px] px-[4px] font-manrope">
        +5
      </span>
    </div>
  );
};

export default TaskLabels;
