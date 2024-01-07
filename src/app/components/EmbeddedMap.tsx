import { Node, Airport, Route } from "../types/MapTypes";
import { LoadingSkeleton } from "./LoadingSkeleton";
// import { GraphComponent } from "./GraphComponent";
import { MapComponent } from "./MapComponent";

export const EmbeddedMap = ({
  nodes,
  airports,
  routes,
  loaded = true,
}: {
  nodes: Node[];
  airports: Airport[];
  routes: Route[];
  loaded: boolean;
}) => {
  return loaded ? (
    <MapComponent nodes={nodes} />
  ) : (
    // <GraphComponent nodes={nodes} airports={airports} routes={routes} />
    <LoadingSkeleton />
  );
};
