export enum ActionTypes {
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  UPDATE_DATA = "UPDATE_DATA",
  UPDATE_USER = "UPDATE_USER",
}

interface AppData {
  tasks: Array<Task>;
  places: Array<Place>;
}

export type Action = {
  type: ActionTypes;
  user?: User;
  data?: AppData;
};

export const loginUser = (user: User, data: AppData): Action => {
  return {
    type: ActionTypes.LOGIN_USER,
    user,
    data,
  };
};

export const logoutUser = (): Action => {
  return {
    type: ActionTypes.LOGOUT_USER,
  };
};

export const updateData = (
  tasks: Array<Task>,
  places: Array<Place>
): Action => {
  return {
    type: ActionTypes.UPDATE_DATA,
    data: {
      tasks,
      places,
    },
  };
};

export const updateUser = (user: User): Action => {
  return {
    type: ActionTypes.UPDATE_USER,
    user,
  };
};
