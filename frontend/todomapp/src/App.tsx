import { useEffect, useState } from "react";
import { loadMapApi } from "./utils/GoogleMapUtils";
import Map from "./components/Map";

import { Box } from "@chakra-ui/react";
import Main from "./components/Main";

function App() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const googleMapsScript = loadMapApi();
    googleMapsScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <Box className="App" w="100%" h="100%">
      {scriptLoaded && (
        <>
          <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />
          <Main />
        </>
      )}
    </Box>
  );
}

export default App;
