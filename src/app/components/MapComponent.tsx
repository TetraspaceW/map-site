import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useMemo, useState } from "react";

import { Node, Airport, Route } from "../types/MapTypes";

import styles from "./styles.module.css";

export const MapComponent = ({
  nodes,
  airports,
  routes,
}: {
  nodes: Node[];
  airports: Airport[];
  routes: Route[];
}) => {
  const mapsLibrary = useMapsLibrary("maps") as google.maps.MapsLibrary;

  useEffect(() => {
    console.log("*** mapsLibrary ", mapsLibrary);
  }, [mapsLibrary]);

  const center = useMemo(() => ({ lat: 0, lng: 0 }), []);
  const [shownRoutes, setShownRoutes] = useState<string>();

  const showRoutes = (code: string) => {
    setShownRoutes(code);
  };

  return (
    <APIProvider
      apiKey={process.env.GOOGLE_MAPS_KEY ?? ""}
      libraries={["marker"]}
    >
      <Map zoom={1} center={center} className={styles.map} mapId={"ampmap"}>
        {airports.map((airport) => {
          const { location, name, code } = airport;
          return (
            <AdvancedMarker
              key={code}
              position={location}
              onClick={(_) => showRoutes(code)}
            >
              <p className={styles.airportmarker}>✈️&nbsp;{code}</p>
            </AdvancedMarker>
          );
        })}
        {nodes.map((node) => {
          const { location, user_name } = node;
          return (
            <AdvancedMarker key={user_name} position={location}>
              <Pin background={"violet"} borderColor={"purple"}>
                {user_name}
              </Pin>
            </AdvancedMarker>
          );
        })}
        {shownRoutes &&
          routes.map((route) => {
            if (mapsLibrary) {
              const polyline = new mapsLibrary.Polyline({
                path: [
                  airports.find((a) => a.code === route.start)
                    ?.location as google.maps.LatLngLiteral,
                  airports.find((a) => a.code === route.end)
                    ?.location as google.maps.LatLngLiteral,
                ],
                geodesic: true,
                strokeColor: route.start === shownRoutes ? "red" : "blue",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              });
            }
            return <></>;
          })}
      </Map>
    </APIProvider>
  );
};
