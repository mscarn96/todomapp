import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";

import { CloseButton } from "@chakra-ui/close-button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Heading } from "@chakra-ui/layout";
import { ScaleFade } from "@chakra-ui/transition";

import { useContextDispatch } from "../../context/Store";
import { addTask } from "../../utils/apiCalls";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

import TaskCreator from "./TaskCreator";
import Tasks from "./Tasks";

interface IPlace {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  openedPlace: Place | undefined;
}

const Place = (props: IPlace) => {
  const { openedPlace } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialDate = new Date();

  const [date, setDate] = useState(initialDate);

  const [taskName, setTaskName] = useState(``);

  const [isTaskCreatorVisible, setTaskCreatorVisible] = useState(false);

  const dispatch = useContextDispatch();

  const [cookies] = useCookies();

  useEffect(() => {
    if (props.isVisible) {
      onOpen();
    } else {
      onClose();
    }
  }, [onClose, onOpen, props.isVisible]);

  const closePlaceInfo = () => {
    props.setVisible(false);
    onClose();
  };

  const submitTask = async (place: Place | undefined) => {
    if (place) {
      try {
        const task: Task = {
          name: taskName,
          completionDate: date.toUTCString(),
          completed: false,
        };
        await addTask(place, task, dispatch, cookies.jwt);
        showSuccessToast("Task added", "You've successfully added a new task");
        setTaskName(``);
      } catch (error) {
        showErrorToast("Something went wrong", `${error.response.data.error}`);
      }
    }
  };

  return (
    <Box
      pos="fixed"
      top="20%"
      left="50%"
      transform="translateX(-50%)"
      width="75%"
    >
      <ScaleFade initialScale={0.9} in={isOpen}>
        <Box
          bgColor="white"
          p="2"
          d="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
        >
          <CloseButton
            size="lg"
            onClick={closePlaceInfo}
            alignSelf="flex-end"
          />
          {!isTaskCreatorVisible && <Tasks openedPlace={openedPlace} />}
          <Heading as="h2" size="md" mt="2" color="teal.500">
            Add new task
          </Heading>
          <TaskCreator
            submitTask={submitTask}
            date={date}
            setDate={setDate}
            taskName={taskName}
            setTaskName={setTaskName}
            openedPlace={openedPlace}
            isVisible={isTaskCreatorVisible}
            setVisible={setTaskCreatorVisible}
          />
        </Box>
      </ScaleFade>
    </Box>
  );
};

export default Place;
