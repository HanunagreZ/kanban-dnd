import useLocalStorage from 'use-local-storage';
import PlusIcon from '../icons/PlusIcon';
import { TColumn, Id, TTask } from '../types';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';

function Board() {
  const [columns, setColumns] = useLocalStorage<TColumn[]>(
    'kanban-columns',
    []
  );
  const [tasks, setTasks] = useLocalStorage<TTask[]>('kanban-tasks', []);

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto px-[40px]">
      <div className="m-auto flex gap-2">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            deleteColumn={deleteColumn}
            updateColumn={updateColumn}
            createTask={createTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            tasks={tasks.filter((task) => task.columnId === column.id)}
          ></Column>
        ))}
        <button
          className="
          h-[60px]
          w-[350px]
          min-w-[350px]
          rounded-lg
          bg-mainBackgroundColor
          border-2
          border-columnBackgroundColor
          p-4
          ring-rose-500
          hover:ring-2
          flex
          gap-2
        "
          onClick={createNewColumn}
        >
          <PlusIcon />
          Add column
        </button>
      </div>
    </div>
  );

  function createNewColumn() {
    const newColumn: TColumn = {
      id: Date.now().toString(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, newColumn]);
  }

  function deleteColumn(id: Id) {
    setColumns(columns.filter((column) => column.id !== id));
  }

  function updateColumn(id: Id, title: string) {
    setColumns(
      columns.map((column) =>
        column.id === id ? { ...column, title } : column
      )
    );
  }

  function createTask(columnId: Id) {
    const newTask: TTask = {
      id: Date.now().toString(),
      columnId,
      title: 'New task',
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function updateTask(id: Id, title: string) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
  }
}

export default Board;
