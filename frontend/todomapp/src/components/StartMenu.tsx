import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const StartMenu = () => {
  const [isNewUser, setIsNewUser] = useState(false);

  return <Flex>{isNewUser ? <Register /> : <Login />}</Flex>;
};

export default StartMenu;
