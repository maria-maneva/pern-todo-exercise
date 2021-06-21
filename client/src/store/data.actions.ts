import { ITodo, ICategory } from "../interfaces";

export enum DataActions {
  SET_TODOS = "SET_TODOS",
  SET_CATEGORIES = "SET_CATEGORIES",
}

export interface IDataAction {
  type: DataActions;
}

export interface IsetTodos extends IDataAction {
  payload: ITodo[];
}
export interface IsetCategories extends IDataAction {
  payload: ICategory[];
}

export type TDataAction = IsetTodos | IsetCategories;

export const setTodos = (todos: ITodo[]): IsetTodos => ({
  type: DataActions.SET_TODOS,
  payload: todos,
});

export const setCategories = (categories: ICategory[]): IsetCategories => ({
  type: DataActions.SET_CATEGORIES,
  payload: categories,
});
