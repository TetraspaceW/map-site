import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";

import { Node, Airport, Route } from "../types/MapTypes";

import styles from "./styles.module.css";

type MapComponentProps = {
  nodes: Node[];
  airports: Airport[];
  routes: Route[];
};

export const MapComponent = (props: MapComponentProps) => {
  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_KEY ?? ""}>
      <GoogleMap {...props} />
    </APIProvider>
  );
};

const GoogleMap = ({ nodes, airports, routes }: MapComponentProps) => {
  const mapsLibrary = useMapsLibrary("maps");

  const map = useMap();

  const center = useMemo(() => ({ lat: 0, lng: 0 }), []);
  const [shownRoutes, setShownRoutes] = useState<string>();
  const polylines = useRef<google.maps.Polyline[]>([]);

  const showRoutes = (code: string) => {
    setShownRoutes(code);
  };

  useEffect(() => {
    const newPolylines: google.maps.Polyline[] = [];

    polylines.current.forEach((polyline) => {
      polyline.setMap(null);
    });

    shownRoutes &&
      routes.map((route) => {
        if (
          mapsLibrary &&
          (shownRoutes === route.start || shownRoutes === route.end)
        ) {
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

          newPolylines.push(polyline);
          polyline.setMap(map);
        }
      });

    polylines.current = newPolylines;
  }, [shownRoutes, airports, map, routes, mapsLibrary]);

  return (
    <Map
      zoom={1}
      center={center}
      className={styles.map}
      mapTypeId="roadmap"
      mapId="b3140740fac03cc0"
      disableDefaultUI={true}
    >
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
    </Map>
  );
};
