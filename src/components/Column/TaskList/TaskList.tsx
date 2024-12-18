import { Draggable, Droppable, Id } from "react-beautiful-dnd";
import { isEmpty } from "lodash";
import { TColumn, TPlaceholderProps } from "../../../types";
import Task from "../../Task/Task";

interface ITaskListProps {
  column: TColumn;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, title: string) => void;
  taskPlaceholderProps: TPlaceholderProps;
}

const TaskList = (props: ITaskListProps) => {
  const { column, deleteTask, updateTask, taskPlaceholderProps } = props;

  return (
    <Droppable droppableId={column.id} type="task">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-col gap-[10px] h-full overflow-y-auto relative"
        >
          {column.tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  className="relative"
                >
                  <Task
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
          {!isEmpty(taskPlaceholderProps) && snapshot.isDraggingOver && (
            <div
              className="absolute border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 opacity-50 transition-all duration-200 pointer-events-none"
              style={{
                top: taskPlaceholderProps.clientY,
                left: taskPlaceholderProps.clientX,
                height: taskPlaceholderProps.clientHeight,
                width: taskPlaceholderProps.clientWidth,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
