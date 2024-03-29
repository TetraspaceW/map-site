import React from "react";
import { Node, Airport, PlaneRoute } from "../types/MapTypes";
import { Header } from "./Header";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { MapComponent } from "./MapComponent";

const GraphComponent = React.lazy(() => import("./GraphComponent"));

export type EmbeddedMapDisplay = "map" | "graph3d";

export const EmbeddedMap = ({
  nodes,
  airports,
  routes,
  loaded = true,
  display = "map",
}: {
  nodes: Node[];
  airports: Airport[];
  routes: PlaneRoute[];
  loaded: boolean;
  display: EmbeddedMapDisplay;
}) => {
  var mapComponent = <LoadingSkeleton />;
  if (!loaded) {
    mapComponent = <LoadingSkeleton />;
  } else {
    switch (display) {
      case "map":
        mapComponent = (
          <MapComponent nodes={nodes} airports={airports} routes={routes} />
        );
        break;
      case "graph3d":
        mapComponent = (
          <GraphComponent nodes={nodes} airports={airports} routes={routes} />
        );
        break;
    }
  }

  return (
    <>
      <Header />
      {mapComponent}
    </>
  );
};
