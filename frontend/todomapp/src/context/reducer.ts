import { Action, ActionTypes } from "./actions";
import { initialState } from "./Store";

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return {
        user: action.user,
        places: action.data?.places,
        tasks: action.data?.tasks,
      };
    case ActionTypes.LOGOUT_USER:
      return initialState;
    case ActionTypes.UPDATE_DATA:
      return {
        ...state,
        places: action.data?.places,
        tasks: action.data?.tasks,
      };
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
  }
};

export default reducer;
