import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface IMap {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const MapContainer = styled.div`
  width: 50vw;
  height: 50vh;
`;

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
    const defaultAddress = new google.maps.LatLng(65.166013499, 13.3698147);
    initMap(4, defaultAddress);
  };

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };

  useEffect(startMap, [map]);

  return (
    <div className="map-container">
      <MapContainer ref={ref} className="map-container__map"></MapContainer>
    </div>
  );
};

export default Map;
