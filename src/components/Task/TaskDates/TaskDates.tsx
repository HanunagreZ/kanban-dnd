import { taskDatesData } from "./taskDatesData";

const TaskDates = () => {
  return (
    <div className="flex gap-[13px] items-center">
      {taskDatesData.map((item) => (
        <div key={item.id} className="flex gap-[4px]">
          <img src={item.imgSrc} alt={item.imgAlt} />
          <span className="text-secondaryGray400 text-[11px] font-medium leading-[12px] font-helvetica">
            {item.date}
          </span>
        </div>
      ))}
       
      <img className="ml-auto" src="/icons/profile-icon-stub.svg" alt="Profile icon stub" />  
    </div>
  );
};

export default TaskDates;