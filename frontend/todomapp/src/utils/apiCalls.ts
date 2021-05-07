import axios from "axios";
import {
  Action,
  loginUser,
  logoutUser,
  updateData,
  updateUser,
} from "../context/actions";
import { LoginFormValues } from "../components/startMenu/Login";
import { RegisterFormValues } from "../components/startMenu/Register";
import React from "react";
import { CookieSetOptions } from "universal-cookie";

export const getMe = async (
  dispatch: React.Dispatch<Action>,
  token: string
) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const userResponse = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/v1/user/getme`,
    config
  );

  if (userResponse.status === 200) {
    const { data } = userResponse.data;
    const user: User = {
      _id: data.id,
      name: data.name,
      email: data.email,
    };

    dispatch(updateUser(user));
  }
};

export const submitLoginForm = async (
  values: LoginFormValues,
  dispatch: React.Dispatch<Action>,
  setCookie: (
    name: string,
    value: any,
    options?: CookieSetOptions | undefined
  ) => void
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/v1/user/login`,
    values
  );
  if (response.status === 200) {
    const token = response.data.token;

    setCookie("jwt", token, { path: "/" });

    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const userResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/user/getme`,
      config
    );
    if (userResponse.status === 200) {
      const { data } = userResponse.data;
      const user = {
        _id: data._id,
        name: data.name,
        email: data.email,
      };
      const appData = {
        places: data.places,
        tasks: data.tasks,
      };
      dispatch(loginUser(user, appData));
    }
  }
};

// todo setcookies when register

export const submitRegisterForm = async (
  values: RegisterFormValues,
  dispatch: React.Dispatch<Action>
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/v1/user/register`,
    values
  );
  if (response.status === 200) {
    const token = response.data.token;

    const config = {
      headers: { Authorization: `bearer ${token}` },
    };

    const userResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/user/getme`,
      config
    );
    if (userResponse.status === 200) {
      const { data } = userResponse;
      const user = {
        _id: data._id,
        name: data.name,
        email: data.email,
      };
      const appData = {
        places: data.places,
        tasks: data.tasks,
      };
      dispatch(loginUser(user, appData));
    }
  }
};

export const submitChangeName = async (
  name: string,
  dispatch: React.Dispatch<Action>,
  token: string
) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const changeNameResponse = await axios.put(
    `${process.env.REACT_APP_API_URL}/api/v1/user/updatename`,
    { name },
    config
  );

  if (changeNameResponse.status === 200) {
    const userResponse = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/user/getme`,
      config
    );

    if (userResponse.status === 200) {
      const { data } = userResponse.data;
      const user: User = {
        _id: data.id,
        name: data.name,
        email: data.email,
      };

      dispatch(updateUser(user));
    }
  }
};

export const submitchangePassword = async (
  currentPassword: string,
  newPassword: string,
  token: string
) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  await axios.put(
    `${process.env.REACT_APP_API_URL}/api/v1/user/updatepassword`,
    { currentPassword, newPassword },
    config
  );
};

export const submitDeletePlacesAndTasks = async (
  dispatch: React.Dispatch<Action>,
  token: string
) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/v1/user/tasks`,
    config
  );
  await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/places`, config);

  getAllData(dispatch, token);
};

// ?? may needed testing later

export const submitDeleteTasks = async (
  dispatch: React.Dispatch<Action>,
  token: string
) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/v1/user/tasks`,
    config
  );

  getAllData(dispatch, token);
};

export const submitDeleteSingleTask = async (
  taskId: string | undefined,
  placeId: string | undefined,
  dispatch: React.Dispatch<Action>,
  token: string
) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  if (placeId && taskId) {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/places/${placeId}/tasks/${taskId}`,
      config
    );
  }

  getAllData(dispatch, token);
};

// ?? may needed testing later

export const logout = async (
  dispatch: React.Dispatch<Action>,
  removeCookies: (name: string, options?: CookieSetOptions | undefined) => void
) => {
  await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/logout`);
  removeCookies("jwt");
  dispatch(logoutUser());
};

export const getAllData = async (
  dispatch: React.Dispatch<Action>,
  token: string
) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const placesResponse = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/v1/places`,
    config
  );

  const tasksResponse = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/v1/user/tasks`,
    config
  );

  const tasks = tasksResponse.data.data;

  const places = placesResponse.data.data;

  dispatch(updateData(tasks, places));
};

export const addPlace = async (
  place: Place,
  dispatch: React.Dispatch<Action>,
  token: string
) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  await axios.post(
    `${process.env.REACT_APP_API_URL}/api/v1/places`,
    { ...place },
    config
  );

  getAllData(dispatch, token);
};

export const addTask = async (
  place: Place,
  task: Task,
  dispatch: React.Dispatch<Action>,
  token: string
) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  await axios.post(
    `${process.env.REACT_APP_API_URL}/api/v1/places/${place._id}/tasks`,
    { ...task },
    config
  );

  await getAllData(dispatch, token);
};

export const updateTask = async (
  placeId: string,
  taskToReplace: Task,
  taskID: string,
  dispatch: React.Dispatch<Action>,
  token: string
) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  await axios.put(
    `${process.env.REACT_APP_API_URL}/api/v1/places/${placeId}/tasks/${taskID}`,
    taskToReplace,
    config
  );

  await getAllData(dispatch, token);
};
