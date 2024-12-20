import { TColumn, Id, TPlaceholderProps } from "@/types";

import ColumnHeader from "@column/ColumnHeader/ColumnHeader";
import TaskList from "@column/TaskList/TaskList";

interface IColumnProps {
  column: TColumn;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, title: string) => void;
  taskPlaceholderProps: TPlaceholderProps;
}

const Column = (props: IColumnProps) => {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    deleteTask,
    updateTask,
    taskPlaceholderProps,
  } = props;

  return (
    <section className="bg-secondaryGray020 w-[300px] h-[694px] rounded-[12px] flex flex-col relative">
      <ColumnHeader
        column={column}
        updateColumn={updateColumn}
        createTask={createTask}
        deleteColumn={deleteColumn}
      />
      <TaskList
        column={column}
        deleteTask={deleteTask}
        updateTask={updateTask}
        taskPlaceholderProps={taskPlaceholderProps}
      />
    </section>
  );
};

export default Column;
