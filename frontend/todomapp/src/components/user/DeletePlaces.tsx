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
import { submitDeletePlacesAndTasks } from "../../utils/apiCalls";

interface IDeletePlaces {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletePlaces = (props: IDeletePlaces) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const dispatch = useContextDispatch();
  const toast = useToast();
  const [cookies] = useCookies();

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
    try {
      await submitDeletePlacesAndTasks(dispatch, cookies.jwt);
      toast({
        title: "Places and Tasks Deleted",
        description: "You've succesfully deleted all your places and tasks",
        status: "info",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
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
    closeModal();
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
              Delete All Places and Tasks
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeModal}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={submit} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeletePlaces;
