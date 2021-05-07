import React, { useEffect, useRef } from "react";

import { useCookies } from "react-cookie";

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

import { useContextDispatch, useContextState } from "../../context/Store";
import { submitDeleteSingleTask } from "../../utils/apiCalls";
import { showErrorToast, showInfoToast } from "../../utils/toast";

interface IDeleteCompletedTasks {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteCompletedTasks = (props: IDeleteCompletedTasks) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef(null);

  const dispatch = useContextDispatch();

  const tasks = useContextState().tasks;

  const [cookies] = useCookies();

  const submit = async () => {
    try {
      tasks?.forEach(async (task) => {
        if (task.completed) {
          await submitDeleteSingleTask(
            task._id,
            task.place,
            dispatch,
            cookies.jwt
          );
        }
      });
      showInfoToast(
        "Completed Tasks deleted",
        "You've succesfully deleted all your completed tasks"
      );
    } catch (err) {
      showErrorToast("Something went wrong", `${err.response.data.error}`);
    }
    closeModal();
  };

  const closeModal = () => {
    props.setVisible(false);
    onClose();
  };

  useEffect(() => {
    if (props.isVisible && !isOpen) {
      onOpen();
    }
  });

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
              Delete All Tasks
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

export default DeleteCompletedTasks;
