import { Id, TTask } from "../../types";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskHeader from "./TaskHeader/TaskHeader";
import TaskDropdown from "./TaskDropdown/TaskDropdown";
import TaskMeta from "./TaskMeta/TaskMeta";
import TaskDates from "./TaskDates/TaskDates";
import TaskLabels from "./TaskLabels/TaskLabels";

interface ITaskProps {
  task: TTask;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, title: string) => void;
}

const Task = (props: ITaskProps) => {
  const { task, deleteTask, updateTask } = props;
  const [editing, setEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isDeleted && (
        <motion.article
          initial={{ opacity: 1, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="cursor-grab bg-baseBW w-[276px] h-[216px] relative rounded-[6px] py-[10px] pl-[12px] pr-[16px] text-secondaryGray600 text-[11px] font-medium flex flex-col gap-[8px] border-[1px] border-cardStroke box-border shadow-custom mx-auto margin border-l-[4px] border-l-textRed">
            <TaskHeader task={task} editing={editing} setEditing={setEditing} updateTask={updateTask} />
            
            <button
              className="hover:bg-gray-200 rounded-[4px] absolute top-[10px] right-[7px]"
              onClick={toggleDropdown}
            >
              <img src="/icons/dots-gray.svg" alt="Dots more icon" />
            </button>

            <TaskDropdown isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} handleDelete={handleDelete} />
            <TaskMeta />
            <TaskDates />
            <TaskLabels />
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );

  function handleDelete() {
    setIsDropdownOpen(false);
    setIsDeleted(true);
    setTimeout(() => deleteTask(task.id), 300);
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleClickOutside(e: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  }
};

export default Task;
