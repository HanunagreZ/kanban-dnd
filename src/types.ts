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
