import useLocalStorage from "use-local-storage";
import { TColumn, Id, TTask } from "../types";
import Column from "./Column";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useCallback } from "react";
import plus from "../icons/plus.svg";

function Board() {
  const [columns, setColumns] = useLocalStorage<TColumn[]>(
    "kanban-columns",
    []
  );

  const onDragEnd = useCallback(
    (result: any) => {
      const { destination, source, draggableId, type } = result;

      // Если нет места назначения, ничего не делаем
      if (!destination) return;

      // Перетаскивание колонок
      if (type === "column") {
        const newColumns = [...columns];
        const [removed] = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, removed);
        setColumns(newColumns);
        return;
      }

      setColumns((prevColumns) => {
        const newColumns = [...columns];

        const sourceColumn = newColumns.find(
          (col) => col.id === source.droppableId
        );
        const destColumn = newColumns.find(
          (col) => col.id === destination.droppableId
        );

        if (!sourceColumn || !destColumn) return newColumns;

        const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
        destColumn.tasks.splice(destination.index, 0, movedTask);

        return newColumns;
      });
    },
    [columns, setColumns]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto px-[18px] py-[18px]">
        <div className="flex gap-2 self-start overflow-x-auto">
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-row gap-[12px]"
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
          h-[42px]
          w-[150px]
          min-w-[150px] 
          px-2
          flex
          items-center  
          justify-between
          cursor-pointer
          text-xs
          font-semibold
          text-secondaryGray400
          hover: rounded-md
          hover:bg-secondaryGray800
          ease-in-out 
          duration-300
        "
            onClick={createNewColumn}
          >
            <img src={plus} alt="Plus icon" />
            Добавить колонку
          </button>
        </div>
      </div>
    </DragDropContext>
  );

  function createNewColumn() {
    const newColumn: TColumn = {
      id: Date.now().toString(),
      title: `Column ${columns.length + 1}`,
      tasks: [],
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
      title: "New task",
    };

    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  }

  function deleteTask(id: Id) {
    setColumns(
      columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== id),
      }))
    );
  }

  function updateTask(id: Id, title: string) {
    setColumns(
      columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === id ? { ...task, title } : task
        ),
      }))
    );
  }
}

export default Board;
