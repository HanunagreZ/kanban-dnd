import { Fragment } from "react/jsx-runtime";

import { taskDatesData } from "./taskDatesData";

const TaskDates = () => {
  return (
    <div className="flex gap-[14px] items-center">
      {taskDatesData.map((item) => (
        <Fragment key={item.id}>
          <img src={item.imgSrc} alt={item.imgAlt} />
          <span className="text-secondaryGray400 text-[11px] font-medium leading-[12px] font-helvetica">
            {item.date}
          </span>
        </Fragment>
      ))}
       
      <img className="ml-auto" src="/icons/profile-icon-stub.svg" alt="Profile icon stub" />  
    </div>
  );
};

export default TaskDates;