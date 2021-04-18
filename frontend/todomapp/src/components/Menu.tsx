import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Container } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";

interface IMain {}

const Menu = (props: IMain) => {
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
        Open Menu
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
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Menu;
