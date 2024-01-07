"use client";

import { useEffect, useRef } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";

import { Node, Airport, Route } from "../types/MapTypes";

export const GraphComponent = ({
  nodes,
  airports,
  routes,
}: {
  nodes: Node[];
  airports: Airport[];
  routes: Route[];
}) => {
  console.log("GOOGLE MAPS API KEY ", process.env.GOOGLE_MAPS_KEY);

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
    <ForceGraph3D
      graphData={{
        nodes: graphNodes,
        links: graphLinks,
      }}
      ref={fgRef}
    />
  );
};
