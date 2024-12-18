export type Id = string;

export type TColumn = {
  id: Id;
  title: string;
  tasks: TTask[];
};

export type TTask = {
  id: Id;
  title: string;
};

export type TPlaceholderProps = {
  clientHeight?: number;
  clientWidth?: number;
  clientX?: number;
  clientY?: number;
};

type TTaskDate = {
  id: number;
  imgSrc: string;
  imgAlt: string;
  date: string;
};

export type TTaskDates = TTaskDate[];

type TTaskLabel = {
  id: number;
  textColor: string;
  backgroundColor: string;
  label: string;
};

export type TTaskLabels = TTaskLabel[];

type TTaskMeta = {
  id: number;
  imgSrc: string;
  imgAlt: string;
  meta: string;
};  

export type TTaskMetaData = TTaskMeta[];