import { Button } from "@chakra-ui/button";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { GoogleLatLng } from "../Map";

interface IPlace {
  place: Place;
  handlePlaceClick: (latlng: GoogleLatLng) => void;
}

const Place = (props: IPlace) => {
  const { place } = props;

  const latlng = new google.maps.LatLng(
    place.location.coordinates[0],
    place.location.coordinates[1]
  );

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
      <Heading size="xs">{place.name}</Heading>
      <Text>{place.location.address}</Text>
      <Button
        colorScheme="teal"
        size="sm"
        onClick={() => props.handlePlaceClick(latlng)}
      >
        Show on map
      </Button>
    </Flex>
  );
};

export default Place;
