import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const StartMenu = () => {
  const [isNewUser, setIsNewUser] = useState(false);

  //bgImage="url('https://cdn.pixabay.com/photo/2017/08/17/07/47/travel-2650303_960_720.jpg')"
  return (
    <Flex>
      {isNewUser ? (
        <Register setIsNewUser={setIsNewUser} />
      ) : (
        <Login setIsNewUser={setIsNewUser} />
      )}
    </Flex>
  );
};

export default StartMenu;
