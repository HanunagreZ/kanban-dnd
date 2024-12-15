export type Id = string;

export type TColumn = {
  id: Id;
  title: string;
};

export type TTask = {
  id: Id;
  columnId: Id;
  title: string;
};
