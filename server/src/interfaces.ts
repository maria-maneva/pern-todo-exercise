export interface ITodo {
  todo_id: number;
  description: string;
  category_ids: number[];
  created_at: string;
}

export interface ICategory {
  cat_id?: number;
  cat_name: string;
}
