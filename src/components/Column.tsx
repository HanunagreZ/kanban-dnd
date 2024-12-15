import { useState } from 'react';
import TrashIcon from '../icons/TrashIcon';
import { TColumn, Id, TTask } from '../types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';

interface ColumnProps {
  column: TColumn;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, title: string) => void;
  tasks: TTask[];
}

const Column = (props: ColumnProps) => {
  const [editing, setEditing] = useState(false);

  const {
    column,
    deleteColumn,
    tasks,
    updateColumn,
    createTask,
    deleteTask,
    updateTask,
  } = props;
  return (
    <div className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 border-columnBackgroundColor flex items-center justify-between">
        <div className="flex gap-2" onClick={() => setEditing(true)}>
          {!editing && column.title}
          {editing && (
            <input
              value={column.title}
              autoFocus
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditing(false);
              }}
              onChange={(e) => updateColumn(column.id, e.target.value)}
            />
          )}
        </div>
        <button
          className="hover:stroke-white stroke-gray-500 px-1 py-2 hover:bg-columnBackgroundColor"
          onClick={() => {
            deleteColumn(column.id);
          }}
        >
          <TrashIcon />
        </button>
      </div>

      <Droppable droppableId={column.id} type="task">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                      userSelect: 'none',
                      padding: '16px',
                      margin: '0 0 8px 0',
                      minHeight: '50px',
                      backgroundColor: 'lightblue',
                      ...provided.draggableProps.style,
                    }}
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

      <button className="mt-auto" onClick={() => createTask(column.id)}>
        Add Task
      </button>
    </div>
  );
};

export default Column;
