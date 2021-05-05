import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Collapse } from "@chakra-ui/transition";

import { DateTimePicker } from "react-rainbow-components";

import "./datePickerStyles.css";

interface ITaskCreator {
  submitTask: (place: Place | undefined) => void;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  taskName: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  openedPlace: Place | undefined;
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const containerStyles = {
  maxWidth: 400,
};

const TaskCreator = (props: ITaskCreator) => {
  const {
    submitTask,
    date,
    setDate,
    taskName,
    setTaskName,
    openedPlace,
    isVisible,
    setVisible,
  } = props;

  const { isOpen, onToggle } = useDisclosure();

  const openTaskCreator = () => {
    setVisible((prev) => !prev);
    onToggle();
  };

  return (
    <>
      <IconButton
        aria-label={isVisible ? "Close task creator" : "Open task creator"}
        icon={isVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
        onClick={() => openTaskCreator()}
        colorScheme="teal"
        variant="outline"
        m="1"
      />

      <Collapse in={isOpen} animateOpacity>
        <Box
          d="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
        >
          {" "}
          <div
            className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
            style={containerStyles}
          >
            <DateTimePicker
              value={date}
              label="Set completion date"
              onChange={(date) => setDate(date)}
              className="rainbow-m-around_small"
              hour24
            />
          </div>
          <Input
            placeholder="Task name"
            p="1"
            width="80%"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Button
            colorScheme="teal"
            m="4"
            onClick={() => submitTask(openedPlace)}
          >
            Add task
          </Button>
        </Box>
      </Collapse>
    </>
  );
};

export default TaskCreator;
