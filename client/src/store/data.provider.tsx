import React, { useReducer } from "react";
import { dataReducer, initialDataState } from "./data.reducer";
import DataContext from "./data.context";

export const DataProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialDataState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
