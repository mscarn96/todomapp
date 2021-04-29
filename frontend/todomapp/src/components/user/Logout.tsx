import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useContextDispatch } from "../../context/Store";
import { logout } from "../../utils/apiCalls";

interface IDeletePlaces {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Logout = (props: IDeletePlaces) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const dispatch = useContextDispatch();
  const toast = useToast();
  const removeCookies = useCookies()[2];

  const closeModal = () => {
    props.setVisible(false);
    onClose();
  };

  useEffect(() => {
    if (props.isVisible && !isOpen) {
      onOpen();
    }
  });

  const submit = async () => {
    closeModal();
    try {
      await logout(dispatch, removeCookies);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: `${err.response.data.error}`,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeModal}
        motionPreset="scale"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to logout?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeModal}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={submit} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Logout;
