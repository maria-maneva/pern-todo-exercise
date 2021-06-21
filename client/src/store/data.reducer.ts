import { IDataState, ICategory, ITodo } from "interfaces";
import { TDataAction, DataActions } from "./data.actions";

export const initialDataState: IDataState = {
  todos: [],
  categories: [],
};

export const dataReducer = (
  state: IDataState,
  action: TDataAction
): IDataState => {
  switch (action.type) {
    case DataActions.SET_TODOS:
      return {
        ...state,
        todos: (action.payload as unknown) as ITodo[],
      };

    case DataActions.SET_CATEGORIES:
      return {
        ...state,
        categories: (action.payload as unknown) as ICategory[],
      };
    default:
      return state;
  }
};
