import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useMemo } from "react";

import { Node } from "../types/MapTypes";

import styles from "./styles.module.css";

export const MapComponent = ({ nodes }: { nodes: Node[] }) => {
  const center = useMemo(() => ({ lat: 0, lng: 0 }), []);

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_KEY ?? ""}>
      <Map zoom={1} center={center} mapContainerClassName={styles.map}>
        {nodes.map((node) => {
          const { location, user_name } = node;
          return (
            <Marker key={user_name} position={location} label={user_name} />
          );
        })}
      </Map>
    </APIProvider>
  );
};
