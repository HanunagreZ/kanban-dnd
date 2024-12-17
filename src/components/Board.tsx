import useLocalStorage from "use-local-storage";
import Column from "./Column";
import { TColumn, Id, TTask } from "../types";
import {
  DragDropContext,
  Draggable,
  DragStart,
  DragUpdate,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useCallback, useState } from "react";
import { isEmpty } from "lodash";

interface PlaceholderProps {
  clientHeight?: number;
  clientWidth?: number;
  clientX?: number;
  clientY?: number;
}

const Board = () => {
  const [columns, setColumns] = useLocalStorage<TColumn[]>(
    "kanban-columns",
    []
  );

  const [placeholderProps, setPlaceholderProps] = useState<PlaceholderProps>({});
  const queryAttr = "data-rbd-drag-handle-draggable-id";

  const getDraggedDom = (draggableId: string) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    return document.querySelector(domQuery);
  };

  const onDragStart = useCallback((event: DragStart) => {
    const draggedDOM = getDraggedDom(event.draggableId);
    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;

    const parentNode = draggedDOM.parentNode as HTMLElement;
    const paddingTop = parseFloat(
      window.getComputedStyle(parentNode).paddingTop
    );

    const clientY =
      paddingTop +
      Array.from(parentNode.children)
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          const style = window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(parentNode).paddingLeft),
    });
  }, []);

  const onDragUpdate = useCallback((event: DragUpdate) => {
    if (!event.destination) {
      setPlaceholderProps({});
      return;
    }

    const draggedDOM = getDraggedDom(event.draggableId);
    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;

    const parentNode = draggedDOM.parentNode as HTMLElement;

    const children = Array.from(parentNode.children).filter(
      (child) => !child.classList.contains("placeholder")
    );

    let clientY = 0;

    if (destinationIndex < children.length) {
      const destinationNode = children[destinationIndex];
      clientY =
        destinationNode.getBoundingClientRect().top -
        parentNode.getBoundingClientRect().top;
    } else {
      const lastNode = children[children.length - 1];
      clientY =
        lastNode.getBoundingClientRect().bottom -
        parentNode.getBoundingClientRect().top;
    }

    const clientX = event.destination.index * (clientWidth + 12);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX,
    });
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      setPlaceholderProps({});
      const { destination, source, type } = result;

      if (!destination) return;

      if (type === "column") {
        const newColumns = [...columns];
        const [removed] = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, removed);
        setColumns(newColumns);
        return;
      }

      setColumns(() => {
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
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <div className="m-auto flex min-h-screen w-full items-center px-[18px] py-[18px] ">
        <div className="flex gap-2 self-start overflow-x-auto relative">
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-row gap-[12px] "
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
                {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
                  <div
                    className="absolute border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 opacity-50 transition-all duration-200 pointer-events-none"
                    style={{
                      
                      top: placeholderProps.clientY,
                      left: placeholderProps.clientX,
                      height: placeholderProps.clientHeight,
                      width: placeholderProps.clientWidth,
                      pointerEvents: "none",
                    }}
                  />
                )}
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
          text-[12px]
          leading-[24px]
          font-semibold
          text-secondaryGray400
          hover: rounded-md
          hover:bg-secondaryGray800
          ease-in-out 
          duration-300
          ml-[6px]
        "
            onClick={createNewColumn}
          >
            <img src={"/icons/plus.svg"} alt="Plus icon" />
            Добавить колонку
          </button>
        </div>
      </div>
    </DragDropContext>
  );

  function createNewColumn() {
    const newColumn: TColumn = {
      id: Date.now().toString(),
      title: `Sprint ${columns.length + 1}`,
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
};

export default Board;
