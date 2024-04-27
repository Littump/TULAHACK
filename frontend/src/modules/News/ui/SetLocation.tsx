import {
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultMarker,
  YMapDefaultSchemeLayer,
  YMapListener,
} from "ymap3-components";
import { useCallback, useState } from "react";
import { YMapLocation } from "@yandex/ymaps3-types/imperative/YMap";
import { LngLat } from "@yandex/ymaps3-types";

interface Props {
  marker: LngLat | undefined;
  setMarker: (el: LngLat) => void;
}

const SetLocation = ({ marker, setMarker }: Props) => {
  const LOCATION: YMapLocation = {
    center: [37.62204198827539, 55.75477308889788],
    zoom: 14,
  };

  const [location, setLocation] = useState(LOCATION);
  const onUpdate = useCallback(({ location, mapInAction }: any) => {
    if (!mapInAction) {
      setLocation({
        center: location.center,
        zoom: location.zoom,
      });
    }
  }, []);

  return (
    <div className="w-full h-[390px] px-4">
      <YMap
        className="shadow-md rounded-xl cursor-pointer"
        zoomRounding="smooth"
        location={location}
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer visible={true} />
        <YMapListener
          onUpdate={onUpdate}
          onClick={(_, m) => setMarker(m.coordinates)}
        />
        {marker && (
          <YMapDefaultMarker
            title="Мероприятие"
            color="#60a5fa"
            coordinates={marker}
          />
        )}
      </YMap>
    </div>
  );
};

export default SetLocation;
