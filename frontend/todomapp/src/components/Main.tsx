import Loader from "./Loader";
import Map from "./Map";
import MainMenu from "./MainMenu";
import User from "./user/User";
import { useEffect, useState } from "react";
import { getAllData } from "../utils/apiCalls";
import { useContextDispatch } from "../context/Store";
import { useCookies } from "react-cookie";

interface IMain {
  scriptLoaded: boolean;
}

const Main = (props: IMain) => {
  const dispatch = useContextDispatch();

  const [cookies] = useCookies();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      getAllData(dispatch, cookies.jwt);
    }

    // todo : repair this...

    return () => setMounted(false);
  }, [dispatch, cookies.jwt, mounted]);

  return (
    <div>
      {props.scriptLoaded ? (
        <>
          <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />
          <MainMenu />
          <User />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Main;
