"use client";
import styles from "./styles.module.css";

import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Pin } from "../types/MapTypes";

export const EmbeddedMap = ({ locations }: { locations: Pin[] }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY ?? "",
  });

  return isLoaded ? <MapComponent locations={locations} /> : <p>Loading...</p>;
};

const MapComponent = ({ locations }: { locations: Pin[] }) => {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName={styles.map}>
      {locations.map((pin) => {
        const { location, user_name } = pin;
        return <Marker key={user_name} position={location} label={user_name} />;
      })}
    </GoogleMap>
  );
};
