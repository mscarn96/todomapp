import { Box, Center } from "@chakra-ui/layout";
import { useCallback, useEffect, useRef, useState } from "react";
// import geocodeLatLng from "../utils/geocoder";
import Place from "./Place";

interface IMap {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map = (props: IMap) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<GoogleMap>();

  const [selectedMarker, setSelectedMarker] = useState<google.maps.Marker>();

  const [isPlaceInfoVisible, setPlaceInfoVisible] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState<string>();

  // const geocoder = useCallback(() => new google.maps.Geocoder(), []);

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (mapRef.current) {
      setMap(
        new google.maps.Map(mapRef.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl: props.mapTypeControl,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          },
          streetViewControl: false,
          rotateControl: false,
          scaleControl: true,
          fullscreenControl: false,
          panControl: false,
          zoomControl: true,
          gestureHandling: "greedy",
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

  const addMarker = useCallback(
    (e: google.maps.MapMouseEvent, map: google.maps.Map) => {
      const oldMarker = selectedMarker;

      const newMarker = new google.maps.Marker({
        position: e.latLng,
        icon: "https://api.iconify.design/noto:cross-mark.svg?height=28",
        draggable: true,
        animation: google.maps.Animation.DROP,
        map: map,
      });
      setPlaceInfoVisible(true);
      setSelectedMarker(newMarker);
      oldMarker?.setMap(null);
      setSelectedAddress("ydadudadahdaj");
      console.log(newMarker.getPosition()?.toString());
      // geocodeLatLng(geocoder(), newMarker?.getPosition(), setSelectedAddress);
    },
    [selectedMarker]
  );

  useEffect(startMap, [startMap]);

  useEffect(() => {
    let clickListener: google.maps.MapsEventListener;
    let dragListener: google.maps.MapsEventListener;
    if (map) {
      clickListener = google.maps.event.addListener(
        map,
        "click",
        (event: google.maps.MapMouseEvent) => addMarker(event, map)
      );
      selectedMarker?.addListener("dragend", () =>
        console.log(`position: ${selectedMarker?.getPosition()}`)
      );
    }

    return () => {
      google.maps.event.removeListener(clickListener);
      google.maps.event.removeListener(dragListener);
    };
  }, [map, addMarker, selectedMarker]);

  return (
    <Center h="100vh" className="map-container">
      <Box
        ref={mapRef}
        className="map-container__map"
        w="95vw"
        h="95vh"
        border="2px"
        borderColor="teal.800"
        borderRadius="base"
      ></Box>
      <Place
        isVisible={isPlaceInfoVisible}
        setVisible={setPlaceInfoVisible}
        placeName={selectedAddress ? selectedAddress : ""}
        map={map}
      />
    </Center>
  );
};

export default Map;
