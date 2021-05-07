import { useCookies } from "react-cookie";

import { IconButton } from "@chakra-ui/button";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/layout";

import { useContextDispatch, useContextState } from "../../context/Store";
import { updateTask } from "../../utils/apiCalls";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../utils/toast";

interface ITasks {
  openedPlace: Place | undefined;
}

export const toggleCompleteTask = async (
  task: Task,
  placeId: string | undefined,
  dispatch: React.Dispatch<any>,
  token: string
) => {
  const taskToReplace = {
    completed: !task.completed,
    name: task.name,
    completionDate: task.completionDate,
  };

  if (task._id && placeId)
    try {
      await updateTask(placeId, taskToReplace, task._id, dispatch, token);
      if (task.completed) {
        showWarningToast("Task status changed", "Task marked as uncompleted");
      } else {
        showSuccessToast("Task status changed", "Task marked as completed");
      }
    } catch (error) {
      showErrorToast(
        "Something went wrong",
        `Can't change task status: ${error.response.data.error}`
      );
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
      <Text as="b" textAlign="center" d="block">
        {currentPlace?.location.address}
      </Text>
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
                  toggleCompleteTask(
                    task,
                    openedPlace?._id,
                    dispatch,
                    cookies.jwt
                  )
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
