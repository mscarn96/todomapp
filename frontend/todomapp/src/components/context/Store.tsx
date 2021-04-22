import { createContext, useReducer, useContext } from "react";
import { Action } from "./actions";
import reducer from "./reducer";

export const initialState: AppState = {
  user: undefined,
  places: [],
  tasks: [],
};

export type AppContext = {
  appState: AppState;
  appDispatch: React.Dispatch<Action>;
};

export const appState = createContext<AppState>(initialState);

export const appDispatch = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <appState.Provider value={state}>
      <appDispatch.Provider value={dispatch}>{children}</appDispatch.Provider>
    </appState.Provider>
  );
};

export const useContextState = (): AppState => {
  const context = useContext(appState);
  if (undefined === context) {
    throw new Error("Please use within AppStateProvider");
  }
  return context;
};

export const useContextDispatch = (): React.Dispatch<Action> => {
  const context = useContext(appDispatch);
  if (undefined === context) {
    throw new Error("Please use within AppDispatchProvider");
  }
  return context;
};
