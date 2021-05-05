import { useEffect, useRef, useState } from "react";

import { useCookies } from "react-cookie";

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

import { useContextDispatch } from "../../context/Store";
import { submitChangeName } from "../../utils/apiCalls";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

interface IChangeName {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeName = (props: IChangeName) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [name, setName] = useState("");

  const [isValid, setIsValid] = useState<boolean>();

  const initialRef = useRef<HTMLInputElement>(null);

  const dispatch = useContextDispatch();

  const [cookies] = useCookies();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setName(name);
    if (name.length > 12 || name.length === 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const closeModal = () => {
    props.setVisible(false);
    onClose();
  };

  const updateName = async () => {
    try {
      await submitChangeName(name, dispatch, cookies.jwt);
      showSuccessToast(
        "Name changed.",
        "You've successfully changed your name."
      );
    } catch (error) {
      showErrorToast("Something went wrong", `${error.response.data.error}`);
    }

    setName("");
    closeModal();
  };

  useEffect(() => {
    if (props.isVisible && !isOpen) {
      onOpen();
    }
  });

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change name</ModalHeader>
          <ModalCloseButton onClick={closeModal} />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>New name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="New name"
                value={name}
                isInvalid={!isValid}
                errorBorderColor="red.300"
                onChange={handleChange}
              />
              <Text color={isValid ? "green.500" : "red.500"}>
                {isValid
                  ? "Correct name"
                  : `Name must be 1 to 12 characters long`}
              </Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              isDisabled={!isValid}
              onClick={updateName}
            >
              Save
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeName;
