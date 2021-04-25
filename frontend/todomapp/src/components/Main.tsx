import Loader from "./Loader";
import Map from "./Map";
import MainMenu from "./MainMenu";
import User from "./user/User";

interface IMain {
  scriptLoaded: boolean;
}

const Main = (props: IMain) => {
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
