import { Id, TTask } from '../types';
import { useState } from 'react';
import TrashIcon from '../icons/TrashIcon';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskProps {
  task: TTask;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, title: string) => void;
}


const Task = (props: TaskProps) => {

  const { task, deleteTask, updateTask } = props;
  const [mouseIsOver, setMouseIsOver] = useState(false);
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
          <div
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={() => setEditing(true)}
      className="cursor-grab bg-black w-[276px] h-[216px]"
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
          onClick={handleDelete}
        >
          <TrashIcon />
        </button>
      )}
    </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Task;
