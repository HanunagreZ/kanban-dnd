import { useEffect, useRef } from "react";

interface ITaskDropdownProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
  handleDelete: () => void;
}

const TaskDropdown = (props: ITaskDropdownProps) => {
  const { isDropdownOpen, setIsDropdownOpen, handleDelete } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isDropdownOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-[36px] right-[12px] bg-white border border-gray-300 rounded-md shadow-md px-[6px] py-[2px] flex z-[2]"
    >
      <button
        className="text-secondaryGray400 text-[12px] font-bold"
        onClick={handleDelete}
      >
        Удалить карточку
      </button>
    </div>
  );

  function handleClickOutside(e: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };
};

export default TaskDropdown;
