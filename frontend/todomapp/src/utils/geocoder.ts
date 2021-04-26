const geocodeLatLng = async (
  geocoder: google.maps.Geocoder,
  latlng: google.maps.LatLng | null | undefined,
  setSelectedAddress: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  geocoder.geocode(
    { location: latlng },
    (
      results: google.maps.GeocoderResult[] | null,
      status: google.maps.GeocoderStatus
    ) => {
      if (status === "OK") {
        if (results) {
          setSelectedAddress(results[0].formatted_address);
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    }
  );
};

// todo get this piece of shit work

export default geocodeLatLng;
