import useLocalStorage from "use-local-storage";
import { TColumn, TPlaceholderProps } from "../../types";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
} from "react-beautiful-dnd";
import { useCallback, useState } from "react";
import AddColumnButton from "./AddColumnButton/AddColumnButton";
import ColumnList from "./ColumnList/ColumnList";

const Board = () => {
  const [columns, setColumns] = useLocalStorage<TColumn[]>(
    "kanban-columns",
    []
  );
  const [columnPlaceholderProps, setColumnPlaceholderProps] =
    useState<TPlaceholderProps>({});
  const [taskPlaceholderProps, setTaskPlaceholderProps] =
    useState<TPlaceholderProps>({});

  const onDragStart = useCallback((event: DragStart) => {
    const draggedDOM = document.querySelector(
      `[data-rbd-drag-handle-draggable-id='${event.draggableId}']`
    );
    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;

    const parentNode = draggedDOM.parentNode as HTMLElement;
    const paddingTop = parseFloat(
      window.getComputedStyle(parentNode).paddingTop
    );
    const paddingLeft = parseFloat(
      window.getComputedStyle(parentNode).paddingLeft
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

    if (event.type === "column") {
      setColumnPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX: paddingLeft,
      });
    } else if (event.type === "task") {
      setTaskPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX: paddingLeft,
      });
    }
  }, []);

  const onDragUpdate = useCallback((event: DragUpdate) => {
    if (!event.destination) {
      setColumnPlaceholderProps({});
      setTaskPlaceholderProps({});
      return;
    }

    const { destination, draggableId, type, source } = event;

    const draggedDOM = document.querySelector(
      `[data-rbd-drag-handle-draggable-id='${draggableId}']`
    );
    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;

    if (type === "column") {
      const parentNode = draggedDOM.parentNode as HTMLElement;
      const children = Array.from(parentNode.children).filter(
        (child) => !child.classList.contains("placeholder")
      );
      let clientY = 0;
      if (destinationIndex === event.source.index) {
        clientY = parentNode.clientHeight - clientHeight;
      } else if (destinationIndex < children.length) {
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
      const clientX = destinationIndex * (clientWidth + 12);

      setColumnPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX,
      });
      return;
    }

    if (type === "task") {
      const droppableParent = document.querySelector(
        `[data-rbd-droppable-id='${destination.droppableId}']`
      ) as HTMLElement;

      if (!droppableParent) return;

      const children = Array.from(droppableParent.children).filter(
        (child) =>
          !child.classList.contains("placeholder") &&
          child.getAttribute("data-rbd-drag-handle-draggable-id") !==
            draggableId
      );

      let clientY = 0;

      if (children.length === 0 || destinationIndex === 0) {
        clientY = 0;
      } else {
        if (
          destination.droppableId === source.droppableId &&
          destination.index > source.index
        ) {
          if (destinationIndex >= children.length) {
            const lastChild = children[children.length - 1] as HTMLElement;
            const lastChildStyle = window.getComputedStyle(lastChild);

            clientY =
              lastChild.offsetTop +
              lastChild.offsetHeight +
              parseFloat(lastChildStyle.marginBottom || "0");
          } else {
            const destinationChild = children[destinationIndex] as HTMLElement;
            clientY = destinationChild.offsetTop;
          }
        } else {
          if (destinationIndex >= children.length) {
            const lastChild = children[children.length - 1] as HTMLElement;
            const lastChildStyle = window.getComputedStyle(lastChild);

            clientY =
              lastChild.offsetTop +
              lastChild.offsetHeight +
              parseFloat(lastChildStyle.marginBottom || "0");
          } else {
            const destinationChild = children[destinationIndex] as HTMLElement;
            const destinationChildStyle =
              window.getComputedStyle(destinationChild);
            clientY =
              destinationChild.offsetTop -
              parseFloat(destinationChildStyle.marginTop || "0");
          }
        }
      }
      setTaskPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX: 0,
      });
    }
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      setColumnPlaceholderProps({});
      setTaskPlaceholderProps({});
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
          <ColumnList
            columns={columns}
            setColumns={setColumns}
            columnPlaceholderProps={columnPlaceholderProps}
            taskPlaceholderProps={taskPlaceholderProps}
          />

          <AddColumnButton createNewColumn={createNewColumn} />
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
};

export default Board;
