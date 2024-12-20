import { Id, TColumn } from "@/types";

import { DraggableLocation } from "react-beautiful-dnd";

export function getMarginBottom(element: HTMLElement): number {
  const style = window.getComputedStyle(element);
  return parseFloat(style.marginBottom) || 0;
}

export function calculateClientY(
  element: HTMLElement,
  sourceIndex: number,
  paddingTop: number
): number {
  let totalHeight = paddingTop;

  let currentElement: HTMLElement | null = element;
  for (let i = 0; i < sourceIndex; i++) {
    currentElement = currentElement!
      .previousElementSibling as HTMLElement | null;
    if (currentElement) {
      totalHeight +=
        currentElement.offsetHeight + getMarginBottom(currentElement);
    }
  }

  return totalHeight;
}

export function columnDrag(
  sourceIndex: number,
  destinationIndex: number,
  columns: TColumn[],
  setColumns: (columns: TColumn[]) => void
) {
  const newColumns = [...columns];
  const [removed] = newColumns.splice(sourceIndex, 1);
  newColumns.splice(destinationIndex, 0, removed);
  setColumns(newColumns);
}

export function taskDrag(
  source: DraggableLocation,
  destination: DraggableLocation,
  columns: TColumn[],
  setColumns: (columns: TColumn[]) => void
) {
  const newColumns = [...columns];

  const sourceColumn = newColumns.find((col) => col.id === source.droppableId);
  const destColumn = newColumns.find(
    (col) => col.id === destination.droppableId
  );

  if (!sourceColumn || !destColumn) return;

  const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
  destColumn.tasks.splice(destination.index, 0, movedTask);

  setColumns(newColumns);
}

export function getDraggedDOM(draggableId: string): HTMLElement | null {
  return document.querySelector(
    `[data-rbd-drag-handle-draggable-id='${draggableId}']`
  );
}

export function getDroppableParent(droppableId: string): HTMLElement | null {
  return document.querySelector(
    `[data-rbd-droppable-id='${droppableId}']`
  ) as HTMLElement;
}

export function filterChildren(
  children: Element[],
  draggableId?: Id
): HTMLElement[] {
  return children.filter(
    (child) =>
      !child.classList.contains("placeholder") &&
      (!draggableId ||
        child.getAttribute("data-rbd-drag-handle-draggable-id") !== draggableId)
  ) as HTMLElement[];
}

export function calculateColumnPlaceholderPosition(
  draggedDOM: HTMLElement,
  parentNode: HTMLElement,
  destinationIndex: number,
  sourceIndex: number
): { clientY: number; clientX: number } {
  const { clientHeight, clientWidth } = draggedDOM;
  const children = filterChildren(Array.from(parentNode.children));

  let clientY = 0;
  if (destinationIndex === sourceIndex) {
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

  return { clientY, clientX };
}

export function calculateTaskPlaceholderPosition(
  droppableParent: HTMLElement,
  destinationIndex: number,
  sourceIndex: number,
  sourceDroppableId: string,
  destinationDroppableId: string,
  draggableId: string
): { clientY: number; clientX: number } {
  const children = filterChildren(
    Array.from(droppableParent.children),
    draggableId
  );

  let clientY = 0;

  if (children.length === 0 || destinationIndex === 0) {
    clientY = 15;
  } else {
    if (
      destinationDroppableId === sourceDroppableId &&
      destinationIndex > sourceIndex
    ) {
      if (destinationIndex >= children.length) {
        const lastChild = children[children.length - 1];
        const lastChildStyle = window.getComputedStyle(lastChild);

        clientY =
          lastChild.offsetTop +
          lastChild.offsetHeight +
          parseFloat(lastChildStyle.marginBottom || "0");
      } else {
        const destinationChild = children[destinationIndex];
        clientY = destinationChild.offsetTop;
      }
    } else {
      if (destinationIndex >= children.length) {
        const lastChild = children[children.length - 1];
        const lastChildStyle = window.getComputedStyle(lastChild);

        clientY =
          lastChild.offsetTop +
          lastChild.offsetHeight +
          parseFloat(lastChildStyle.marginBottom || "0");
      } else {
        const destinationChild = children[destinationIndex];
        const destinationChildStyle = window.getComputedStyle(destinationChild);
        clientY =
          destinationChild.offsetTop -
          parseFloat(destinationChildStyle.marginTop || "0");
      }
    }
  }

  return { clientY, clientX: 0 };
}
