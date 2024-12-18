import { useEffect, useRef, useState } from "react";
import { Id, TColumn } from "../../../types";

interface IColumnHeaderProps {
  column: TColumn;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteColumn: (id: Id) => void;
}

const ColumnHeader = (props: IColumnHeaderProps) => {
  const { column, updateColumn, createTask, deleteColumn } = props;

  const [editing, setEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[20px] cursor-grab flex items-center justify-between gap-[14px] mt-[12px] px-[12px]">
      <div
        className="flex max-w-[199px] w-full h-[12px]"
        onClick={() => setEditing(true)}
      >
        {!editing && (
          <img
            className="mr-[8px]"
            src="/icons/avatar.svg"
            alt="Column status icon"
          />
        )}

        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-secondaryGray400 text-sm font-bold leading-[12px] h-[14px]">
          {!editing && column.title}
        </h1>
        {editing && (
          <input
            className="max-w-[199px] w-full text-secondaryGray400 text-sm font-bold italic"
            value={column.title}
            autoFocus
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              setEditing(false);
            }}
            onChange={(e) => updateColumn(column.id, e.target.value)}
          />
        )}
      </div>
      <div className="flex justify-center items-center gap-[4px] h-[20px]">
        <span className="px-[3px] rounded-[4px] bg-primaryBlue text-xs font-semibold">
          {column.tasks.length}
        </span>
        <button
          className="hover:bg-gray-200 rounded-[4px]"
          onClick={() => {
            createTask(column.id);
          }}
        >
          <img src="icons/plus-blue.svg" alt="Plus icon" />
        </button>
        <button
          className="hover:bg-gray-200 rounded-[4px]"
          onClick={toggleDropdown}
        >
          <img src="/icons/dots-blue.svg" alt="More icon" />
        </button>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-[36px] right-[12px] bg-white border border-gray-300 rounded-md shadow-md px-[6px] py-[2px] flex z-[2]"
          >
            <button
              className="text-secondaryGray400 text-[12px] font-bold"
              onClick={() => {
                deleteColumn(column.id);
                setIsDropdownOpen(false);
              }}
            >
              Удалить колонку
            </button>
          </div>
        )}
      </div>
    </div>
  );

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleClickOutside(e: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  }
};

export default ColumnHeader;
