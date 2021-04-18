import Loader from "./Loader";
import Map from "./Map";
import Menu from "./Menu";

interface IMain {
  scriptLoaded: boolean;
}

const Main = (props: IMain) => {
  return (
    <div>
      {props.scriptLoaded ? (
        <>
          <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />
          <Menu />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Main;
