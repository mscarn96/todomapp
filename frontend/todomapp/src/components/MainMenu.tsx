import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Heading } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";

const MainMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

            <DrawerBody>
              <Flex justify="space-around">
                <Box>
                  <Heading>Places</Heading>
                </Box>
                <Box>
                  <Heading>Tasks</Heading>
                </Box>
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
