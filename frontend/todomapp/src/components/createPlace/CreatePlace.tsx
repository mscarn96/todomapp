import { useEffect, useRef, useState } from "react";

import { useCookies } from "react-cookie";

import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { useDisclosure, useOutsideClick } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { ScaleFade } from "@chakra-ui/transition";

import { useContextDispatch } from "../../context/Store";
import { addPlace } from "../../utils/apiCalls";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

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

const submitPlace = async (
  coordinates: [number, number] | undefined,
  icon: string | undefined,
  name: string,
  dispatch: React.Dispatch<any>,
  token: string,
  closeCreatePlace: () => void,
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
      tasks: [],
    };
    try {
      await addPlace(place, dispatch, token);
      showSuccessToast(
        `Place added.`,
        `You've successfully added place named ${place.name}`
      );
      marker?.setMap(null);
      setSelectedMarker(undefined);
    } catch (error) {
      showErrorToast("Something went wrong", `${error.response.data.error}`);
    }
  } else {
    showErrorToast("Something went wrong", `Can't add place`);
  }

  closeCreatePlace();
};

const CreatePlace = (props: IPlace) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");

  const [pickedIcon, setPickedIcon] = useState<string>();

  const dispatch = useContextDispatch();

  const [cookies] = useCookies();

  const ref = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const closeCreatePlace = () => {
    props.setVisible(false);
    onClose();
  };

  useOutsideClick({
    ref: ref,
    handler: () => {
      closeCreatePlace();
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
            onClick={closeCreatePlace}
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
                closeCreatePlace,
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

export default CreatePlace;
