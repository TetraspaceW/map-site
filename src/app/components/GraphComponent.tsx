import { useEffect, useRef } from "react";
import { Node, Airport, Route } from "../types/MapTypes";
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d";

export const GraphComponent = ({
  nodes,
  airports,
  routes,
}: {
  nodes: Node[];
  airports: Airport[];
  routes: Route[];
}) => {
  const fgRef = useRef<ForceGraphMethods>();

  useEffect(() => {
    fgRef.current?.d3Force("link")?.distance((link: any) => {
      const relevantRoute = routes.find(
        (route) =>
          route.start === link.source.id && route.end === link.target.id
      );
      return relevantRoute?.length || 20;
    });
  });

  const graphLinks = nodes
    .map((node) => {
      return { source: node.user_id, target: node.nearest_airport };
    })
    .concat(
      routes.map((route) => {
        return { source: route.start, target: route.end };
      })
    );

  const graphNodes = nodes
    .map((node) => {
      return {
        id: node.user_id,
        name: node.user_name,
        color: "#aa00aa",
        type: "node",
        val: 2,
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
      ref={fgRef}
      nodeCanvasObject={(node, ctx, _) => {
        if (node.x && node.y) {
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `${node.val * 2}px Sans-Serif`;
          ctx.fillStyle = "black";
          ctx.fillText(node.name, node.x, node.y);
        }
      }}
      nodeCanvasObjectMode={() => "after"}
    />
  );
};
