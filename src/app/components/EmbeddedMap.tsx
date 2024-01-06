import { Node, Airport, Route } from "../types/MapTypes";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { GraphComponent } from "./GraphComponent";

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
    <GraphComponent nodes={nodes} airports={airports} routes={routes} />
  ) : (
    <LoadingSkeleton />
  );
};
