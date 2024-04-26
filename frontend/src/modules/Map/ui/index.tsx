import {useState} from "react";
import TCoordinates from "@/modules/Map/types/mapTypes.ts";
import {YMap, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer} from "ymap3-components";


const Map = () => {
  const [zoom, setZoom] = useState<number>(13);
  const [center, setCenter] = useState<TCoordinates>([51,52]);
  const [placemarkCurrent, setPlacemarkCurrent] = useState<TCoordinates>(center);
  return (
    <div className="w-full h-[500px] px-4">
      <YMap
          className="shadow-md rounded-xl cursor-pointer"

          location={{
            zoom: zoom,
            center: center,
          }}
      >
          <YMapDefaultMarker
              title='точка запяточка'
              color="#60a5fa"
              coordinates={placemarkCurrent}
          />
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
      </YMap>
    </div>
  );
};

export default Map;
