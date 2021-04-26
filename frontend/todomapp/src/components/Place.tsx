import { CloseButton } from "@chakra-ui/close-button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { ScaleFade } from "@chakra-ui/transition";
import { useEffect, useState } from "react";
import icons from "../assets/icons";
import IconPicker from "./IconPicker";

interface IPlace {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  placeName: string;
  map: google.maps.Map | undefined;
}

const Place = (props: IPlace) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const closePlaceInfo = () => {
    props.setVisible(false);
    onClose();
  };

  useEffect(() => {
    if (props.isVisible) {
      onOpen();
    } else {
      onClose();
    }
  }, [onClose, onOpen, props.isVisible]);

  console.log(icons);

  return (
    <Box pos="fixed" top="20%" left="10%">
      <ScaleFade initialScale={0.9} in={isOpen}>
        <Box bgColor="white" p="3">
          <CloseButton onClick={closePlaceInfo} />
          <Heading m="1" size="md">
            Add new place
          </Heading>
          <Text m="1">{props.placeName}</Text>
          <Input
            placeholder="Place name"
            variant="filled"
            value={name}
            onChange={handleInputChange}
            m="1"
          />
          <IconPicker />
        </Box>
      </ScaleFade>
    </Box>
  );
};

export default Place;
