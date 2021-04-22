import axios from "axios";
import { Action, loginUser } from "../components/context/actions";
import { LoginFormValues } from "../components/startmenu/Login";
import { RegisterFormValues } from "../components/startmenu/Register";

export const submitLoginForm = async (
  values: LoginFormValues,
  dispatch: React.Dispatch<Action>
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/v1/user/login`,
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
