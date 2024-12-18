const TaskDates = () => {
  return (
    <div className="flex gap-[14px] items-center">
      <div className="flex gap-[2px] h-[14px] items-center">
        <img src="/icons/calendar.svg" alt="Calendar icon" />
        <span className="text-secondaryGray400 text-[11px] font-medium leading-[12px] font-helvetica">
          02.02
        </span>
      </div>
      <div className="flex gap-[2px] h-[14px] items-center">
        <img src="/icons/flag.svg" alt="Flag icon" />
        <span className="text-secondaryGray400 text-[11px] font-medium leading-[12px] font-helvetica">
          24.04
        </span>
      </div>
      <div className="flex gap-[2px] h-[14px] items-center">
        <img src="/icons/fire.svg" alt="Fire icon" />
        <span className="text-secondaryGray400 text-[11px] font-medium leading-[12px] font-helvetica">
          24.04
        </span>
      </div>
      <img className="ml-auto" src="/icons/profile-icon-stub.svg" alt="Profile icon stub" />
    </div>
  );
};

export default TaskDates;