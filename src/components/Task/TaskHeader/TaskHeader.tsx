import { useEffect, useRef } from "react";

import { Id, TTask } from "@/types";

interface ITaskHeaderProps {
  task: TTask;
  editing: boolean;
  setEditing: (value: boolean) => void;
  updateTask: (id: Id, title: string) => void;
}

const TaskHeader = ({
  task,
  editing,
  setEditing,
  updateTask,
}: ITaskHeaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="flex flex-col gap-[8px]">
      <span className="text-secondaryGray600 text-[11px] font-medium inline-block h-[13px]">
        #{task.id}
      </span>
      {!editing && (
        <h3
          onClick={() => setEditing(true)}
          className="inline-block h-[45px] overflow-hidden text-ellipsis text-[12px] font-semibold leading-[15px] cursor-pointer"
        >
          {task.title}
        </h3>
      )}
      {editing && (
        <input
          ref={inputRef}
          value={task.title}
          autoFocus
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setEditing(false);
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
          className="mb-[20.5px] p-[4px]"
        />
      )}
    </div>
  );

  function handleClickOutside(e: MouseEvent) {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setEditing(false);
    }
  }
};

export default TaskHeader;
