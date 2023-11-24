import styles from "./styles.module.css";

import { useMemo } from "react";
import { Pin } from "../types/MapTypes";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export const EmbeddedMap = ({
  locations,
  locationsLoaded = true,
}: {
  locations: Pin[];
  locationsLoaded: boolean;
}) => {
  return locationsLoaded ? (
    <MapComponent locations={locations} />
  ) : (
    <LoadingSkeleton />
  );
};

const MapComponent = ({ locations }: { locations: Pin[] }) => {
  const center = useMemo(() => ({ lat: 0, lng: 0 }), []);

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_KEY ?? ""}>
      <Map zoom={1} center={center} mapContainerClassName={styles.map}>
        {locations.map((pin) => {
          const { location, user_name } = pin;
          return (
            <Marker key={user_name} position={location} label={user_name} />
          );
        })}
      </Map>
    </APIProvider>
  );
};
