import { useEffect, useState } from "react";
import { loadMapApi } from "./utils/GoogleMapUtils";
import Map from "./components/Map";
import styled from "styled-components";

const AppComponent = styled.div`
  width: 50vw;
  height: 50vh;
`;

function App() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const googleMapsScript = loadMapApi();
    googleMapsScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <AppComponent className="App">
      {scriptLoaded && (
        <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />
      )}
    </AppComponent>
  );
}

export default App;
