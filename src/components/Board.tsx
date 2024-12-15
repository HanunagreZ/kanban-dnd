import useLocalStorage from 'use-local-storage';
import PlusIcon from '../icons/PlusIcon';
import { TColumn, Id, TTask } from '../types';
import Column from './Column';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useCallback, useEffect } from 'react';

function Board() {
  const [columns, setColumns] = useLocalStorage<TColumn[]>(
    'kanban-columns',
    []
  );
  const [tasks, setTasks] = useLocalStorage<TTask[]>('kanban-tasks', []);

  const onDragEnd = useCallback(
    (result: any) => {
      const { destination, source, draggableId, type } = result;

      // Если нет места назначения, ничего не делаем
      if (!destination) return;

      // Перетаскивание колонок
      if (type === 'column') {
        const newColumns = [...columns];
        const [removed] = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, removed);
        setColumns(newColumns);
        return;
      }

      // const draggedTask = tasks.find((task) => task.id === draggableId);
      // if (!draggedTask) return; // Если задача не найдена, ничего не делаем

      // const startColumn = columns.find(
      //   (column) => column.id === source.droppableId
      // );
      // const finishColumn = columns.find(
      //   (column) => column.id === destination.droppableId
      // );

      // if (startColumn === finishColumn) {
      //   // Перетаскивание в пределах одной колонки
      //   const newTasks = [...tasks];
      //   const startTaskIndex = newTasks.findIndex(
      //     (task) => task.id === draggedTask.id
      //   );
      //   const [removedTask] = newTasks.splice(startTaskIndex, 1);
      //   newTasks.splice(destination.index, 0, removedTask);

      //   setTasks(newTasks);
      // }
      // } else {
      //   if (!finishColumn) return;
      //   // Перетаскивание в другую колонку
      //   const newTasks = [...tasks];
      //   const startTaskIndex = newTasks.findIndex(
      //     (task) => task.id === draggedTask.id
      //   );
      //   const [removedTask] = newTasks.splice(startTaskIndex, 1);
      //   newTasks.splice(destination.index, 0, {
      //     ...removedTask,
      //     columnId: finishColumn.id,
      //   });

      //   setTasks(newTasks);
      // }
    },
    [columns, tasks, setColumns, setTasks]
  );

  useEffect(() => {
    localStorage.setItem('kanban-columns', JSON.stringify(columns));
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [columns, tasks]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto px-[40px]">
        <div className="m-auto flex gap-2">
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                {columns.map((column, index) => (
                  <Draggable
                    key={column.id}
                    draggableId={column.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Column
                          key={column.id}
                          column={column}
                          deleteColumn={deleteColumn}
                          updateColumn={updateColumn}
                          createTask={createTask}
                          deleteTask={deleteTask}
                          updateTask={updateTask}
                          tasks={tasks.filter(
                            (task) => task.columnId === column.id
                          )}
                        ></Column>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

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
    </DragDropContext>
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
