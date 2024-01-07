import { Node, Airport, Route } from "../types/MapTypes";
import { GraphComponent } from "./GraphComponent";
import { Header } from "./Header";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { MapComponent } from "./MapComponent";

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
  routes: Route[];
  loaded: boolean;
  display: EmbeddedMapDisplay;
}) => {
  var mapComponent = <LoadingSkeleton />;
  if (!loaded) {
    mapComponent = <LoadingSkeleton />;
  } else {
    switch (display) {
      case "map":
        mapComponent = <MapComponent nodes={nodes} />;
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
