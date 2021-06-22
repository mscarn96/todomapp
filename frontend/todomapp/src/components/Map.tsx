import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Box, Center } from "@chakra-ui/layout";

import { useContextState } from "../context/Store";
import mapDatatoGoogleMaps from "../utils/mapDatatoGoogleMap";
import geocodeLatLng from "../utils/geocoder";

import { showErrorToast } from "../utils/toast";

import CreatePlace from "./createPlace/CreatePlace";
import Place from "./place/Place";
import MainMenu from "./mainMenu/MainMenu";

interface IMap {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
}

export type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map = (props: IMap) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<GoogleMap>();

  const [selectedMarker, setSelectedMarker] = useState<google.maps.Marker>();

  const [isPlaceInfoVisible, setPlaceInfoVisible] = useState(false);

  const [isCreatePlaceVisible, setCreatePlaceVisible] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState<string>();

  const [selectedLatLng, setSelectedLatLng] = useState<[number, number]>();

  const state = useContextState();

  const markers: Array<google.maps.Marker> = useMemo(() => [], []);

  const [openedPlace, setOpenedPlace] = useState<Place>();

   const geocoder = useCallback(() => new google.maps.Geocoder(), []);

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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          initMap(
            8,
            new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          );
        }
      );
    } else {
      initMap(8, new google.maps.LatLng(52.23225415761537, 21.006003221991673));
      //default map position, in case user don't have geolocation unlocked
      showErrorToast(
        "Geolocation Error",
        "Can't use geolocation. Moving to default positon."
      );
    }
  };

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };

  const moveToTargetPlace = (latlng: GoogleLatLng) => {
    if (map) {
      map.panTo(latlng);
    }
  };

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent, map: google.maps.Map) => {
      const oldMarker = selectedMarker;
      oldMarker?.setMap(null);

      const newMarker = new google.maps.Marker({
        position: e.latLng,
        icon: "https://api.iconify.design/noto:cross-mark.svg?height=28",
        draggable: true,
        animation: google.maps.Animation.DROP,
        map: map,
      });
      setCreatePlaceVisible(true);
      setPlaceInfoVisible(false);
      setSelectedMarker(newMarker);
      setSelectedAddress("ydadudadahdaj");
      // console.log(newMarker.getPosition()?.toString());
      const lat = newMarker.getPosition()?.lat();
      const lng = newMarker.getPosition()?.lng();
      if (lat !== undefined && lng !== undefined) {
        setSelectedLatLng([lat, lng]);
      }

       geocodeLatLng(geocoder(), newMarker?.getPosition(), setSelectedAddress);
    },
    [selectedMarker,geocoder]
  );

  useEffect(startMap, [startMap]);

  useEffect(
    () =>
      mapDatatoGoogleMaps(
        state,
        map,
        markers,
        setPlaceInfoVisible,
        setOpenedPlace
      ),
    [map, markers, state]
  );

  useEffect(() => {
    let clickListener: google.maps.MapsEventListener;
    let dragListener: google.maps.MapsEventListener;
    if (map) {
      clickListener = google.maps.event.addListener(
        map,
        "click",
        (event: google.maps.MapMouseEvent) => handleMapClick(event, map)
      );
      selectedMarker?.addListener("dragend", () =>
        console.log(`position: ${selectedMarker?.getPosition()}`)
      );
    }

    return () => {
      google.maps.event.removeListener(clickListener);
      google.maps.event.removeListener(dragListener);
    };
  }, [map, handleMapClick, selectedMarker]);

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
      <MainMenu moveToTargetPlace={moveToTargetPlace} />
      {isCreatePlaceVisible && (
        <CreatePlace
          isVisible={isCreatePlaceVisible}
          setVisible={setCreatePlaceVisible}
          placeName={selectedAddress ? selectedAddress : ""}
          map={map}
          coordinates={selectedLatLng}
          setSelectedMarker={setSelectedMarker}
          marker={selectedMarker}
        />
      )}
      {isPlaceInfoVisible && (
        <Place
          isVisible={isPlaceInfoVisible}
          setVisible={setPlaceInfoVisible}
          openedPlace={openedPlace}
        />
      )}
    </Center>
  );
};

export default Map;
