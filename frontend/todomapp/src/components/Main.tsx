import { useEffect, useState } from "react";

import { useCookies } from "react-cookie";

import { getAllData } from "../utils/apiCalls";
import { useContextDispatch } from "../context/Store";

import Loader from "./Loader";
import Map from "./Map";
import User from "./user/User";

interface IMain {
  scriptLoaded: boolean;
}

const Main = (props: IMain) => {
  const dispatch = useContextDispatch();

  const [cookies] = useCookies();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && cookies.jwt) {
      getAllData(dispatch, cookies.jwt);
    }

    return () => setMounted(false);
  }, [dispatch, cookies.jwt, mounted]);

  return (
    <div>
      {props.scriptLoaded ? (
        <>
          <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />
          <User />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Main;
