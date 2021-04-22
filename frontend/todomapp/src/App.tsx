import { useEffect, useState } from "react";
import { loadMapApi } from "./utils/GoogleMapUtils";

import { Box } from "@chakra-ui/react";

import Main from "./components/Main";
import StartMenu from "./components/startmenu/StartMenu";

function App() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const googleMapsScript = loadMapApi();
    googleMapsScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <Box className="App" w="100%" h="100%" overflow="hidden">
      {isLoggedIn ? (
        <Main scriptLoaded={scriptLoaded} />
      ) : (
        <StartMenu setIsLoggedIn={setIsLoggedIn} />
      )}
    </Box>
  );
}

export default App;
