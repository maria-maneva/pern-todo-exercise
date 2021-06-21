import { useContext, useMemo, Dispatch } from "react";
import DataContext from "../store/data.context";
import { TDataAction } from "../store/data.actions";

export const useDataDispatch = (): Dispatch<TDataAction> => {
  const { dispatch } = useContext(DataContext);

  return useMemo(() => dispatch, [dispatch]);
};
