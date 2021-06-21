export interface ITodo {
  todo_id: number;
  description: string;
  categories?: ICategory[];
}

export interface ICategory {
  cat_name: string;
  cat_id: number;
  selected?: boolean;
}

export interface IDataState {
  todos: ITodo[];
  categories: ICategory[];
}
