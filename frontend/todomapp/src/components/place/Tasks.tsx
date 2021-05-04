import { IconButton } from "@chakra-ui/button";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { createStandaloneToast } from "@chakra-ui/toast";
import React from "react";
import { useCookies } from "react-cookie";
import { useContextDispatch, useContextState } from "../../context/Store";
import { updateTask } from "../../utils/apiCalls";

interface ITasks {
  openedPlace: Place | undefined;
}

const toast = createStandaloneToast();

const toggleCompleteTask = async (
  task: Task,
  openedPlace: Place | undefined,
  dispatch: React.Dispatch<any>,
  token: string
) => {
  const taskToReplace = {
    completed: !task.completed,
    name: task.name,
    completionDate: task.completionDate,
  };
  const toastStatus = task.completed ? "warning" : "success";

  if (openedPlace && task._id)
    try {
      await updateTask(openedPlace, taskToReplace, task._id, dispatch, token);
      console.log(taskToReplace.name);
      toast({
        title: "Task status changed",
        description: `Task marked as ${
          task.completed ? `uncompleted` : "completed"
        }`,
        status: toastStatus,
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `Can't change task status: ${error.response.data.error}`,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
};

const Tasks = (props: ITasks) => {
  const { openedPlace } = props;

  const dispatch = useContextDispatch();

  const [cookies] = useCookies();

  const state = useContextState();

  const currentPlace = state.places?.find(
    (place) => place._id === openedPlace?._id
  );

  const tasks = state.tasks?.filter((task) => task.place === openedPlace?._id);

  //todo set max task name at 20 characters in backend

  return (
    <Box w="100%" maxH="35vh">
      <Heading textAlign="center">{currentPlace?.name}</Heading>
      <Text as="i" textAlign="center" d="block">
        Tasks in current place:
      </Text>
      <Box
        overflowY="scroll"
        overflowX="hidden"
        maxH="25vh"
        whiteSpace="nowrap"
      >
        {tasks?.map((task) => {
          const date = new Date(task.completionDate + "");
          return (
            <Box
              w="100%"
              d="flex"
              justifyContent="space-evenly"
              alignItems="center"
              key={task._id}
            >
              <Text
                as={task.completed ? "del" : "b"}
                color="teal.800"
                flexBasis="33%"
              >
                {task.name}
              </Text>
              <Text textAlign="center">
                {date.toLocaleDateString()}
                <br />
                {date.toLocaleTimeString()}
              </Text>
              <IconButton
                aria-label="Check completed task"
                icon={<CheckCircleIcon />}
                variant="outline"
                color={task.completed ? `green.300` : `gray.400`}
                onClick={() =>
                  toggleCompleteTask(task, openedPlace, dispatch, cookies.jwt)
                }
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Tasks;
