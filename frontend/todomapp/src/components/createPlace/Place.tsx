import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { useDisclosure, useOutsideClick } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { createStandaloneToast } from "@chakra-ui/toast";
import { ScaleFade } from "@chakra-ui/transition";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useContextDispatch } from "../../context/Store";
import { addPlace } from "../../utils/apiCalls";
import IconPicker from "./IconPicker";

interface IPlace {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  placeName: string;
  map: google.maps.Map | undefined;
  coordinates: [number, number] | undefined;
  setSelectedMarker: React.Dispatch<
    React.SetStateAction<google.maps.Marker | undefined>
  >;
  marker: google.maps.Marker | undefined;
}

const toast = createStandaloneToast();

const submitPlace = async (
  coordinates: [number, number] | undefined,
  icon: string | undefined,
  name: string,
  dispatch: React.Dispatch<any>,
  token: string,
  closePlaceInfo: () => void,
  setSelectedMarker: React.Dispatch<
    React.SetStateAction<google.maps.Marker | undefined>
  >,
  marker: google.maps.Marker | undefined
) => {
  if (coordinates && icon) {
    const place = {
      location: {
        type: "Point",
        coordinates,
      },
      name,
      icon,
    };
    try {
      await addPlace(place, dispatch, token);
      toast({
        title: "Place added.",
        description: `You've successfully added place named ${place.name}`,
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      marker?.setMap(null);
      setSelectedMarker(undefined);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `${error.response.data.error}`,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  } else {
    toast({
      title: "Something went wrong",
      description: `Can't add place`,
      status: "error",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  }

  closePlaceInfo();
};

const Place = (props: IPlace) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");

  const [pickedIcon, setPickedIcon] = useState<string>();

  const dispatch = useContextDispatch();

  const [cookies] = useCookies();

  const ref = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const closePlaceInfo = () => {
    props.setVisible(false);
    onClose();
  };

  useOutsideClick({
    ref: ref,
    handler: () => {
      closePlaceInfo();
    },
  });

  useEffect(() => {
    if (props.isVisible) {
      onOpen();
    } else {
      onClose();
    }
  }, [onClose, onOpen, props.isVisible]);

  return (
    <Box
      pos="fixed"
      top="20%"
      left="50%"
      transform="translateX(-50%)"
      ref={ref}
    >
      <ScaleFade initialScale={0.9} in={isOpen}>
        <Box
          bgColor="white"
          p="3"
          d="flex"
          flexDirection="column"
          alignItems="center"
        >
          <CloseButton
            size="lg"
            onClick={closePlaceInfo}
            alignSelf="flex-end"
          />
          <Heading textAlign="center" m="1" size="xl">
            Add new place
          </Heading>
          <Text textAlign="center" m="1">
            {props.placeName}
          </Text>
          <Input
            placeholder="Place name"
            variant="filled"
            value={name}
            onChange={handleInputChange}
            m="1"
          />
          <Heading textAlign="center" m="1" size="sm">
            Pick place icon
          </Heading>
          <IconPicker setPickedIcon={setPickedIcon} />
          <Button
            w="50%"
            colorScheme="teal"
            m="1"
            isDisabled={!name}
            onClick={() =>
              submitPlace(
                props.coordinates,
                pickedIcon,
                name,
                dispatch,
                cookies.jwt,
                closePlaceInfo,
                props.setSelectedMarker,
                props.marker
              )
            }
          >
            Add place
          </Button>
        </Box>
      </ScaleFade>
    </Box>
  );
};

export default Place;
