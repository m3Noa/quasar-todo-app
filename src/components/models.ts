export interface Todo {
  id: number;
  content: string;
  completed: boolean;
  addDate: number,
  completeDate: number
}

export interface Meta {
  totalCount: number;
}
