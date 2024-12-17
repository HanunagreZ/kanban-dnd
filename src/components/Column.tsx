import { useEffect, useRef, useState } from "react";
import { TColumn, Id } from "../types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { img } from "framer-motion/client";

interface ColumnProps {
  column: TColumn;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, title: string) => void;
}

const Column = (props: ColumnProps) => {
  const [editing, setEditing] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    deleteTask,
    updateTask,
  } = props;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-secondaryGray020 w-[300px] h-[694px] rounded-[12px] flex flex-col gap-[12px] relative">
      <div className="h-[20px] cursor-grab flex items-center justify-between gap-[14px] mt-[12px] px-[12px]">
        <div
          className="flex max-w-[199px] w-full h-[12px] "
          onClick={() => setEditing(true)}
        >

          {!editing && (
            <img className='mr-[8px]' src="../src/icons/avatar.svg" alt="Column status icon"/>
               
          )}  


          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-secondaryGray400 text-sm font-bold leading-[12px] h-[14px]">
            {!editing && column.title}
          </span>
          {editing && (
            <input
              className="max-w-[199px] w-full text-secondaryGray400 text-sm font-bold italic"
              value={column.title}
              autoFocus
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditing(false);
              }}
              onChange={(e) => updateColumn(column.id, e.target.value)}
            />
          )}
        </div>
        <div className="flex justify-center items-center gap-[4px] h-[20px]">
          <span className="px-[3px]  rounded-[4px] bg-primaryBlue text-xs font-semibold">
            {column.tasks.length}
          </span>
          <button
            className="hover:bg-gray-200 rounded-[4px]"
            onClick={() => {
              createTask(column.id);
            }}
          >
            <img src="../src/icons/plus-blue.svg" alt="Plus icon" />
          </button>
          <button
            className="hover:bg-gray-200 rounded-[4px]"
            onClick={toggleDropdown}
          >
            <img src="../src/icons/dots-blue.svg" alt="More icon" />
          </button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-[36px] right-[12px] bg-white border border-gray-300 rounded-md shadow-md px-[6px] py-[2px] flex z-[2]"
            >
              <button
                className=" text-secondaryGray400 text-[12px] font-bold"
                onClick={() => {
                  deleteColumn(column.id);
                  setIsDropdownOpen(false);
                }}
              >
                Удалить колонку
              </button>
            </div>
          )}
        </div>
      </div>

      <Droppable droppableId={column.id} type="task">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-[10px] h-full overflow-y-auto"
          >
            {column.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                     
                  >
                    <Task
                      key={task.id}
                      task={task}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
           
                {provided.placeholder}
            
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
