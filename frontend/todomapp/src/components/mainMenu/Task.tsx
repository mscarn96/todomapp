import { IconButton } from "@chakra-ui/button";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { useCookies } from "react-cookie";
import { useContextDispatch, useContextState } from "../../context/Store";

import { toggleCompleteTask } from "../place/Tasks";

interface ITask {
  task: Task;
}
const Task = (props: ITask) => {
  const { task } = props;

  const dispatch = useContextDispatch();

  const placeOfCurrentTask = useContextState().places?.find(
    (place) => place._id === task.place
  );

  const [cookies] = useCookies();

  const date = new Date(task.completionDate + "");

  return (
    <Flex
      direction="column"
      boxShadow="2xl"
      border="2px"
      borderRadius="md"
      borderColor="teal.600"
      p="2"
      m="1"
    >
      <Heading
        size="xs"
        as={task.completed ? "del" : "b"}
        textAlign="center"
        color={task.completed ? "green.300" : "blackAlpha.800"}
      >
        {task.name}
      </Heading>
      <Text size="sm" textAlign="center">
        {date.toLocaleDateString()}
        <br />
        {date.toLocaleTimeString()}
      </Text>
      <Text as="i" textAlign="center">
        at: {placeOfCurrentTask?.name}
      </Text>
      <IconButton
        aria-label="Check completed task"
        icon={<CheckCircleIcon />}
        variant="outline"
        color={task.completed ? `green.300` : `gray.400`}
        size="sm"
        onClick={() =>
          toggleCompleteTask(task, task.place, dispatch, cookies.jwt)
        }
      />
    </Flex>
  );
};

export default Task;
