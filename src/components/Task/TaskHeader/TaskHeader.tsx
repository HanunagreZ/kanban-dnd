import { Id, TTask } from "../../../types";

interface TaskHeaderProps {
  task: TTask;
  editing: boolean;
  setEditing: (value: boolean) => void;
  updateTask: (id: Id, title: string) => void;
}

const TaskHeader = ({ task, editing, setEditing, updateTask }: TaskHeaderProps) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <span className="text-secondaryGray600 text-[11px] font-medium inline-block h-[13px]">
        #{task.id}
      </span>
      {!editing && (
        <h2
          onClick={() => setEditing(true)}
          className="inline-block h-[45px] overflow-hidden text-ellipsis text-[12px] font-semibold leading-[15px] cursor-pointer"
        >
          {task.title}
        </h2>
      )}
      {editing && (
        <input
          value={task.title}
          autoFocus
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setEditing(false);
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
          className="mb-[28.5px]"
        />
      )}
    </div>
  );
};

export default TaskHeader;