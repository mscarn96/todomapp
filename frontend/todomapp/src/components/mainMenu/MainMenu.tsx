import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Container, Flex, Heading } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { useContextState } from "../../context/Store";
import { GoogleLatLng } from "../Map";
import Place from "./Place";
import Task from "./Task";

interface IMainMenu {
  moveToTargetPlace: (latlng: GoogleLatLng) => void;
}

const MainMenu = (props: IMainMenu) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const state = useContextState();

  const handlePlaceClick = (latlng: GoogleLatLng) => {
    onClose();
    props.moveToTargetPlace(latlng);
  };

  return (
    <>
      <Container
        position="fixed"
        maxW="50%"
        bottom="5%"
        left="50%"
        transform="translateX(-50%)"
        centerContent
        color="teal.700"
        fontSize="xl"
        boxShadow="2xl"
        p="2"
        border="2px"
        borderColor="teal.700"
        borderRadius="md"
        bgColor="rgba(255,255,255,0.5)"
      >
        Show all
        <IconButton
          colorScheme="teal"
          aria-label="Open main menu"
          icon={<ArrowUpIcon />}
          size="lg"
          onClick={onOpen}
        />
      </Container>

      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>All places and tasks</DrawerHeader>

            <DrawerBody p="1">
              <Flex justify="space-between">
                <Flex direction="column" maxWidth="50%">
                  <Heading m="5" textAlign="center">Places</Heading>
                  <Flex
                    overflowY="scroll"
                    overflowX="hidden"
                    maxH="50vh"
                    direction="column"
                  >
                    {state.places?.map((place) => (
                      <Place
                        key={place._id}
                        place={place}
                        handlePlaceClick={handlePlaceClick}
                      />
                    ))}
                  </Flex>
                </Flex>
                <Flex direction="column" flexBasis="50%">
                  <Heading m="5" textAlign="center">Tasks</Heading>
                  <Flex
                    overflowY="scroll"
                    overflowX="hidden"
                    maxH="50vh"
                    direction="column"
                  >
                    {state.tasks?.map((task) => (
                      <Task key={task._id} task={task} />
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default MainMenu;
