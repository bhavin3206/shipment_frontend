import React, { createContext, ReactNode, useReducer } from "react";
import authService from "../services/auth.service";
authService.is_jwt_expired().then((result) => {});
const initValue = {
  isAuthenticated: false,
};

const Context = createContext<{
  state: { isAuthenticated: boolean };
  dispatch: React.Dispatch<ActionType>;
}>({ state: {} } as {
  state: { isAuthenticated: boolean };
  dispatch: React.Dispatch<ActionType>;
});

interface ActionType {
  type: "AUTHENTICATION";
  payload: {
    status: boolean;
  };
}

const reducer = (
  state: { isAuthenticated: boolean },
  action: ActionType
): { isAuthenticated: boolean } => {
  const { type, payload } = action;

  return { ...state, isAuthenticated: payload.status as boolean };
};

const ContextProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initValue);
  console.log(state);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

const ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };
