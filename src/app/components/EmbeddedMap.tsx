import styles from "./styles.module.css";

import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Pin } from "../types/MapTypes";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const EmbeddedMap = ({
  locations,
  locationsLoaded = true,
}: {
  locations: Pin[];
  locationsLoaded: boolean;
}) => {
  const { isLoaded: mapLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY ?? "",
  });

  return mapLoaded && locationsLoaded ? (
    <MapComponent locations={locations} />
  ) : (
    <LoadingSkeleton />
  );
};

const MapComponent = ({ locations }: { locations: Pin[] }) => {
  const center = useMemo(() => ({ lat: 0, lng: 0 }), []);

  return (
    <GoogleMap zoom={1} center={center} mapContainerClassName={styles.map}>
      {locations.map((pin) => {
        const { location, user_name } = pin;
        return <Marker key={user_name} position={location} label={user_name} />;
      })}
    </GoogleMap>
  );
};
