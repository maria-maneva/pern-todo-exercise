import { useContext, useMemo } from "react";
import DataContext from "../store/data.context";
import { IDataState } from "interfaces";

export const useDataState = (): IDataState => {
  const { state } = useContext(DataContext);

  return useMemo(() => state, [state]);
};
