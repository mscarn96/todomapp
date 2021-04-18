import { Box, Center } from "@chakra-ui/layout";
import { useEffect, useRef, useState } from "react";

interface IMap {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map = (props: IMap) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl: props.mapTypeControl,
          streetViewControl: false,
          rotateControl: false,
          scaleControl: true,
          fullscreenControl: false,
          panControl: false,
          zoomControl: true,
          gestureHandling: "cooperative",
          mapTypeId: props.mapType,
          draggableCursor: "pointer",
        })
      );
    }
  };

  const defaultMapStart = (): void => {
    const defaultAddress = new google.maps.LatLng(53.1292051, 23.1596436);
    initMap(8, defaultAddress);
  };

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };

  useEffect(startMap, [startMap]);

  return (
    <Center h="100vh" className="map-container">
      <Box
        ref={ref}
        className="map-container__map"
        w="95vw"
        h="95vh"
        border="2px"
        borderColor="teal.800"
        borderRadius="base"
      ></Box>
    </Center>
  );
};

export default Map;
