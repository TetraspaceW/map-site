import { Node, Airport, Route } from "../types/MapTypes";
import { GraphComponent } from "./GraphComponent";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { MapComponent } from "./MapComponent";

type EmbeddedMapDisplay = "map" | "graph3d";

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
  return loaded ? (
    {
      map: <MapComponent nodes={nodes} />,
      graph3d: (
        <GraphComponent nodes={nodes} airports={airports} routes={routes} />
      ),
    }[display]
  ) : (
    <LoadingSkeleton />
  );
};
