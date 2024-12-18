import { TColumn, TPlaceholderProps, TTask } from "@/types";

import { Droppable, Draggable, Id } from "react-beautiful-dnd";

import { isEmpty } from "lodash";

import Column from "@/components/Column/Column";

interface IColumnListProps {
  columns: TColumn[];
  setColumns: (columns: TColumn[]) => void;
  columnPlaceholderProps: TPlaceholderProps;
  taskPlaceholderProps: TPlaceholderProps;
}

const ColumnList = (props: IColumnListProps) => {
  const { columns, setColumns, columnPlaceholderProps, taskPlaceholderProps } =
    props;

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-row gap-[12px]"
        >
          {columns.map((column, index) => (
            <Draggable key={column.id} draggableId={column.id} index={index}>
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
                    taskPlaceholderProps={taskPlaceholderProps}
                  />
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
          {!isEmpty(columnPlaceholderProps) && snapshot.isDraggingOver && (
            <div
              className="absolute border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 opacity-50 transition-all duration-200 pointer-events-none"
              style={{
                top: columnPlaceholderProps.clientY,
                left: columnPlaceholderProps.clientX,
                height: columnPlaceholderProps.clientHeight,
                width: columnPlaceholderProps.clientWidth,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      )}
    </Droppable>
  );

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
};

export default ColumnList;
