// Sets the map on all markers in the array.
const setMapOnAll = (
  map: google.maps.Map | null,
  markers: Array<google.maps.Marker>
) => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
};

// Removes the markers from the map, but keeps them in the array.
const clearMarkers = (markers: Array<google.maps.Marker>) => {
  setMapOnAll(null, markers);
};

// Deletes all markers in the array
const deleteMarkers = (markers: Array<google.maps.Marker>) => {
  clearMarkers(markers);
  markers.splice(0, markers.length);
};

const openPlaceInfo = (
  place: Place,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenedPlace: React.Dispatch<React.SetStateAction<Place | undefined>>
) => {
  setOpenedPlace(place);
  setVisible(true);
};

const mapDatatoGoogleMaps = (
  state: AppState,
  map: google.maps.Map | undefined,
  markers: Array<google.maps.Marker>,
  setPlaceInfoVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenedPlace: React.Dispatch<React.SetStateAction<Place | undefined>>
) => {
  if (map) {
    deleteMarkers(markers);
    state.places?.forEach((place) => {
      const position = {
        lat: place.location.coordinates[0],
        lng: place.location.coordinates[1],
      };
      const marker = new google.maps.Marker({
        position,
        map,
        clickable: true,
        icon: {
          url: place.icon,
          scaledSize: new google.maps.Size(64, 64),
        },
      });
      marker.addListener("click", () =>
        openPlaceInfo(place, setPlaceInfoVisible, setOpenedPlace)
      );
      markers.push(marker);
    });
  }
};

export default mapDatatoGoogleMaps;
