import { useState } from "react";
import { TColumn, Id } from "../types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./Task";

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

  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    deleteTask,
    updateTask,
  } = props;
  return (
    <div className="bg-secondaryGray020 w-[300px] h-[694px] rounded-[12px] flex flex-col p-3 gap-[12px]">
      <div className="h-[20px] cursor-grab flex items-center justify-between gap-[14px]">
        <div
          className="flex  max-w-[199px] w-full"
          onClick={() => setEditing(true)}
        >
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-secondaryGray400 text-sm font-bold italic">
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
        <div className="flex justify-center items-center gap-[4px] h-[20px] ">
          <span className="px-[3px] py-[2px] rounded-[4px] bg-primaryBlue text-xs font-semibold">
            {column.tasks.length}
          </span>
          <button
            onClick={() => {
              createTask(column.id);
            }}
          >
            <img src="../src/icons/plus-blue.svg" alt="Plus icon" />
          </button>
          <button
            onClick={() => {
              deleteColumn(column.id);
            }}
          >
            <img src="../src/icons/trash-can.svg" alt="Trash icon" />
          </button>
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
