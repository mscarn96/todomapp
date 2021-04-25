import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { useState } from "react";
import { useContextState } from "../../context/Store";
import ChangeName from "./ChangeName";
import ChangePassword from "./ChangePassword";

interface Props {}

const User = (props: Props) => {
  const user = useContextState().user;

  const [isChangeNameVisible, setChangeNameVisible] = useState(false);
  const [isChangePasswordVisible, setChangePasswordVisible] = useState(false);

  return (
    <>
      <Flex
        position="fixed"
        top="0%"
        right="0%"
        p="4"
        mt="2.5vh"
        mr="2.5vw"
        border="2px"
        borderColor="teal.700"
        borderRadius="md"
        bgColor="white"
        justify="space-between"
        align="center"
        flexBasis="20%"
      >
        <Text as="b" mr="2">
          {user?.name}
        </Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setChangeNameVisible(true)}>
              Change name
            </MenuItem>
            <MenuItem onClick={() => setChangePasswordVisible(true)}>
              Change password
            </MenuItem>
            <MenuDivider />
            <MenuItem>Delete all tasks</MenuItem>
            <MenuItem>Delete all places and tasks</MenuItem>
            <MenuDivider />
            <MenuItem as="b" color="teal">
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <ChangeName
        isVisible={isChangeNameVisible}
        setVisible={setChangeNameVisible}
      />
      <ChangePassword
        isVisible={isChangePasswordVisible}
        setVisible={setChangePasswordVisible}
      />
    </>
  );
};

export default User;
