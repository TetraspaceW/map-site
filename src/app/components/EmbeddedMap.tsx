import styles from "./styles.module.css";

import { Node, Airport, Route } from "../types/MapTypes";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ForceGraph2D } from "react-force-graph";

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
    <MapComponent nodes={nodes} airports={airports} routes={routes}/>
  ) : (
    <LoadingSkeleton />
  );
};

const MapComponent = ({
  nodes,
  airports,
  routes
}: {
  nodes: Node[];
  airports: Airport[];
  routes: Route[]
}) => {
  const graphLinks = nodes.map((node) => {
    return { source: node.user_id, target: node.nearest_airport };
  }).concat(routes.map((route) => {
    return { source: route.start, target: route.end }
  }));

  const graphNodes = nodes
    .map((node) => {
      return {
        id: node.user_id,
        name: node.user_name,
        color: "#aa00aa",
        type: "node",
        val: 1,
      };
    })
    .concat(
      airports.map((airport) => {
        return {
          id: airport.code,
          name: airport.code,
          val: 4,
          color: "#888888",
          type: "airport",
        };
      })
    );

  return (
    <ForceGraph2D
      graphData={{
        nodes: graphNodes,
        links: graphLinks,
      }}
      nodeCanvasObject={(node, ctx, globalScale) => {
        if (node.x && node.y) {
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `${node.val * 4}px Sans-Serif`;
          ctx.fillStyle = "black";
          ctx.fillText(node.name, node.x, node.y);
        }
      }}
      nodeCanvasObjectMode={() => "after"}
    />
  );
};
