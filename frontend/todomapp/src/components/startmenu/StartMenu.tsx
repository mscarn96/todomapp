import { useState } from "react";

import { Flex } from "@chakra-ui/layout";

import Login from "./Login";
import Register from "./Register";

interface IStartMenu {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const StartMenu = (props: IStartMenu) => {
  const [isNewUser, setIsNewUser] = useState(false);

  const { setIsLoggedIn } = props;

  //bgImage="url('https://cdn.pixabay.com/photo/2017/08/17/07/47/travel-2650303_960_720.jpg')"
  return (
    <Flex>
      {isNewUser ? (
        <Register setIsNewUser={setIsNewUser} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setIsNewUser={setIsNewUser} setIsLoggedIn={setIsLoggedIn} />
      )}
    </Flex>
  );
};

export default StartMenu;
