import { useEffect, useState } from "react";
import { loadMapApi } from "./utils/GoogleMapUtils";

import { Box } from "@chakra-ui/react";

import Main from "./components/Main";
import StartMenu from "./components/startMenu/StartMenu";
import { useCookies } from "react-cookie";
import { useContextDispatch, useContextState } from "./context/Store";
import { getMe } from "./utils/apiCalls";
import { Application } from "react-rainbow-components";

const customTheme = {
  rainbow: {
    palette: {
      brand: "#319795",
    },
  },
};

function App() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cookies] = useCookies();
  const dispatch = useContextDispatch();
  const user = useContextState().user;

  useEffect(() => console.log("mounted"), []);

  useEffect(() => {
    const googleMapsScript = loadMapApi();
    googleMapsScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (cookies.jwt && !isLoggedIn) {
      setIsLoggedIn(true);
      getMe(dispatch, cookies.jwt);
    }
  }, []); // eslint-disable-line
  //Es lint disabled because this effect should trigger only once when app mounts

  useEffect(() => {
    if (cookies.jwt || user) return;
    setIsLoggedIn(false);
  }, [cookies.jwt, user]);
  //checks if user logged out

  return (
    <Application theme={customTheme}>
      <Box className='App' w='100%' h='100%' overflow='hidden'>
        {isLoggedIn ? (
          <Main scriptLoaded={scriptLoaded} />
        ) : (
          <StartMenu setIsLoggedIn={setIsLoggedIn} />
        )}
      </Box>
    </Application>
  );
}

export default App;
