const mapDatatoGoogleMaps = (
  state: AppState,
  map: google.maps.Map | undefined
) => {
  if (map) {
    state.places?.forEach((place) => {
      const position = {
        lat: place.location.coordinates[0],
        lng: place.location.coordinates[1],
      };
      new google.maps.Marker({
        position,
        map,
        clickable: true,
      });
    });
  }
};

export default mapDatatoGoogleMaps;
