import { useState } from "react";

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

import { useContextState } from "../../context/Store";

import ChangeName from "./ChangeName";
import ChangePassword from "./ChangePassword";
import DeletePlaces from "./DeletePlaces";
import DeleteCompletedTasks from "./DeleteCompletedTasks";
import Logout from "./Logout";

const User = () => {
  const user = useContextState().user;

  const [isChangeNameVisible, setChangeNameVisible] = useState(false);

  const [isChangePasswordVisible, setChangePasswordVisible] = useState(false);

  const [isDeleteTasksVisible, setDeleteTasksVisible] = useState(false);

  const [isDeletePlacesVisible, setDeletePlacesVisible] = useState(false);

  const [isLogoutVisible, setLogoutVisible] = useState(false);

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
            <MenuItem onClick={() => setDeleteTasksVisible(true)}>
              Delete all completed tasks
            </MenuItem>
            <MenuItem onClick={() => setDeletePlacesVisible(true)}>
              Delete all places and tasks
            </MenuItem>
            <MenuDivider />
            <MenuItem
              as="b"
              cursor="pointer"
              color="teal"
              onClick={() => setLogoutVisible(true)}
            >
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
      <DeleteCompletedTasks
        isVisible={isDeleteTasksVisible}
        setVisible={setDeleteTasksVisible}
      />
      <DeletePlaces
        isVisible={isDeletePlacesVisible}
        setVisible={setDeletePlacesVisible}
      />
      <Logout isVisible={isLogoutVisible} setVisible={setLogoutVisible} />
    </>
  );
};

export default User;
