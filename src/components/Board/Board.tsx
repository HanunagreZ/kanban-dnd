import { useState } from "react";

import { TColumn, TPlaceholderProps } from "@/types";

import {
  calculateClientY,
  calculateColumnPlaceholderPosition,
  calculateTaskPlaceholderPosition,
  columnDrag,
  getDraggedDOM,
  getDroppableParent,
  getMarginBottom,
  taskDrag,
} from "@/utils";

import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
} from "react-beautiful-dnd";

import useLocalStorage from "use-local-storage";

import ColumnList from "@board/ColumnList/ColumnList";
import AddColumnButton from "@board/AddColumnButton/AddColumnButton";

const Board = () => {
  const [columns, setColumns] = useLocalStorage<TColumn[]>(
    "kanban-columns",
    []
  );
  const [columnPlaceholderProps, setColumnPlaceholderProps] =
    useState<TPlaceholderProps>({});
  const [taskPlaceholderProps, setTaskPlaceholderProps] =
    useState<TPlaceholderProps>({});

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <div className="m-auto flex min-h-screen w-full items-center px-[18px] py-[18px]">
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

  function onDragStart(event: DragStart) {
    const draggedDOM = getDraggedDOM(event.draggableId);

    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const parentNode = draggedDOM.parentNode as HTMLElement;

    const paddingTop = getMarginBottom(parentNode);
    const paddingLeft = getMarginBottom(parentNode);

    const clientY = calculateClientY(
      draggedDOM,
      event.source.index,
      paddingTop
    );

    if (event.type === "column") {
      setColumnPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX: paddingLeft,
      });
    } else {
      setTaskPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX: paddingLeft,
      });
    }
  }

  function onDragUpdate(event: DragUpdate) {
    if (!event.destination) {
      setColumnPlaceholderProps({});
      setTaskPlaceholderProps({});
      return;
    }

    const { destination, draggableId, type, source } = event;

    const draggedDOM = getDraggedDOM(draggableId);
    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;

    if (type === "column") {
      const parentNode = draggedDOM.parentNode as HTMLElement;
      const { clientY, clientX } = calculateColumnPlaceholderPosition(
        draggedDOM,
        parentNode,
        destinationIndex,
        event.source.index
      );

      setColumnPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX,
      });
      return;
    }

    if (type === "task") {
      const droppableParent = getDroppableParent(destination.droppableId);
      if (!droppableParent) return;

      const { clientY, clientX } = calculateTaskPlaceholderPosition(
        droppableParent,
        destinationIndex,
        source.index,
        source.droppableId,
        destination.droppableId,
        draggableId
      );

      setTaskPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX,
      });
    }
  }

  function onDragEnd(result: DropResult) {
    const { destination, source, type } = result;

    setColumnPlaceholderProps({});
    setTaskPlaceholderProps({});

    if (!destination) return;

    if (type === "column") {
      columnDrag(source.index, destination.index, columns, setColumns);
    } else {
      taskDrag(source, destination, columns, setColumns);
    }
  }
};

export default Board;
