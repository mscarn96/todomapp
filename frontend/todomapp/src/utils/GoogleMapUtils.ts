export const loadMapApi = () => {
  const mapurl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&&region=NO&v=quarterly`;
  const scripts = document.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(mapurl) === 0) {
      return scripts[i];
    }
  }

  const googleMapScript = document.createElement("script");
  googleMapScript.src = mapurl;
  googleMapScript.async = true;
  googleMapScript.defer = true;
  window.document.body.appendChild(googleMapScript);

  return googleMapScript;
};
