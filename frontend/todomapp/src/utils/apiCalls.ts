import axios from "axios";
import { Action, loginUser, updateUser } from "../context/actions";
import { LoginFormValues } from "../components/startmenu/Login";
import { RegisterFormValues } from "../components/startmenu/Register";
import React from "react";
import { CookieSetOptions } from "universal-cookie";

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
  dispatch: React.Dispatch<Action>,
  token: string
) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  //todo password form validation, create log out, delete all tasks/places (possibly backend work)

  await axios.put(
    `${process.env.REACT_APP_API_URL}/api/v1/user/updatepassword`,
    { currentPassword, newPassword },
    config
  );
};
