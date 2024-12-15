import { Draggable } from 'react-beautiful-dnd';
import { Id, TTask } from '../types';
import { useState } from 'react';
import TrashIcon from '../icons/TrashIcon';

interface TaskProps {
  task: TTask;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, title: string) => void;
}

const Task = (props: TaskProps) => {
  const { task, deleteTask, updateTask } = props;

  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={() => setEditing(true)}
    >
      <span>#{task.id}</span>
      {!editing && task.title}

      {editing && (
        <input
          value={task.title}
          autoFocus
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;
            setEditing(false);
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      )}

      {mouseIsOver && (
        <button
          className="hover:stroke-white stroke-gray-500 px-1 py-2 hover:bg-columnBackgroundColor"
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default Task;
