import { createContext, Dispatch } from "react";
import { IDataState } from "../interfaces";
import { TDataAction } from "./data.actions";
import { initialDataState } from "./data.reducer";

const DataContext = createContext<{
  state: IDataState;
  dispatch: Dispatch<TDataAction>;
}>({
  state: initialDataState,
  dispatch: () => undefined,
});

export default DataContext;
