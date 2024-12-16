import { Id, TTask } from "../types";
import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { motion, AnimatePresence } from "framer-motion";

interface TaskProps {
  task: TTask;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, title: string) => void;
}

const Task = (props: TaskProps) => {
  const { task, deleteTask, updateTask } = props;
  const [editing, setEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    setIsDeleted(true);
    setTimeout(() => deleteTask(task.id), 300);
  };

  return (
    <AnimatePresence>
      {!isDeleted && (
        <motion.div
          initial={{ opacity: 1, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="cursor-grab bg-baseBW w-[276px] h-[216px] relative rounded-[6px] py-[12px] px-[16px] text-secondaryGray600 text-[11px] font-medium flex flex-col gap-[8px] border-[1px] border-cardStroke box-border">
            <div className="flex flex-col gap-[8px]">
              <span className="text-secondaryGray600 text-[11px] font-medium inline-block h-[13px]">
                #{task.id}
              </span>

              {!editing && (
                <span
                  onClick={() => setEditing(true)}
                  className="inline-block h-[45px] overflow-hidden text-ellipsis"
                >
                  {task.title}
                </span>
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

            <img
              className="absolute top-[10px] right-[7px]"
              src="../src/icons/dots-gray.svg"
              alt="Dots more icon"
            />

            <div className="flex gap-[4px] h-[16px]">
              <img src="../src/icons/suitcase.svg" alt="Suitcase icon" />
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-secondaryGray400 text-[12px] font-medium max-w-[134px]">
                Проект с длиннннным названием
              </span>
            </div>

            <span className="text-secondaryGray400 text-[12px] font-medium inline-block h-[17px]">
              SP:
              <span className="text-secondaryGray600 text-[12px] font-semibold inline-block px-[12px] bg-secondaryGray050 rounded-[4px] ml-[3px] h-[17px]">
                123
              </span>
            </span>

            <div className="flex justify-between">
              <div className="flex gap-[3px] h-[14px] items-center">
                <img src="../src/icons/subtasks.svg" alt="Subtasks icon" />
                <span className="text-secondaryGray400 text-[12px] font-medium leading-[12px]">
                  283
                </span>
              </div>

              <div className="flex gap-[3px] h-[14px] items-center">
                <img src="../src/icons/chat.svg" alt="Chat icon" />
                <span className="text-secondaryGray400 text-[12px] font-medium leading-[12px]">
                  21
                </span>
              </div>

              <div className="flex gap-[3px] h-[14px] items-center">
                <img src="../src/icons/time.svg" alt="Time icon" />
                <span className="text-secondaryGray400 text-[12px] font-medium leading-[12px]">
                  21.6
                </span>
              </div>

              <div className="flex gap-[3px] h-[14px] items-center">
                <img src="../src/icons/speed.svg" alt="Speed icon" />
                <span className="text-secondaryGray400 text-[12px] font-medium leading-[12px]">
                  162 / 131
                </span>
              </div>
            </div>

            <div className="flex gap-[11.5px] items-center">
              <div className="flex gap-[2px] h-[14px] items-center">
                <img src="../src/icons/calendar.svg" alt="Calendar icon" />
                <span className="text-secondaryGray400 text-[12px] font-medium leading-[12px]">
                  02.02
                </span>
              </div>

              <div className="flex gap-[2px] h-[14px] items-center">
                <img src="../src/icons/flag.svg" alt="Flag icon" />
                <span className="text-secondaryGray400 text-[12px] font-medium leading-[12px]">
                  24.04
                </span>
              </div>

              <div className="flex gap-[2px] h-[14px] items-center">
                <img src="../src/icons/fire.svg" alt="Fire icon" />
                <span className="text-secondaryGray400 text-[12px] font-medium leading-[12px]">
                  24.04
                </span>
              </div>

              <img
                className="ml-auto"
                src="../src/icons/profile-icon-stub.svg"
                alt="Profile icon stub"
              />
            </div>

            <div className="flex gap-[4px]">
              <span className="text-textGreen text-[8px] font-bold leading-[12px] py-[2px] px-[4px] rounded-[4px] bg-backgroundGreen w-fit">
                ПОД ПРИСМОТРОМ
              </span>
              <span className="text-textRed text-[8px] font-bold leading-[12px] py-[2px] px-[4px] rounded-[4px] bg-backgroundRed w-fit">
                СРОЧНО
              </span>
              <span className="text-textOrange text-[8px] font-bold leading-[12px] py-[2px] px-[4px] rounded-[4px] bg-backgroundOrange w-fit">
                УТОЧНЕНИЯ
              </span>
              <span className="text-secondaryGray400 text-[10px] font-medium leading-[12px] py-[2px] px-[4px]">
                +5
              </span>
            </div>

            <button
              className="hover:stroke-white stroke-gray-500 px-1 py-2 hover:bg-columnBackgroundColor absolute top-[0] right-[27px]"
              onClick={handleDelete}
            >
              <TrashIcon />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Task;
