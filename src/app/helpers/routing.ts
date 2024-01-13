import { PlaneRoute } from "../types/MapTypes";
import { DijkstraCalculator } from "@aeolun/dijkstra-calculator";

export const getShortestPathBetween = (
  routes: PlaneRoute[],
  from: string,
  to: string
) => {
  const graph = new DijkstraCalculator();

  // find unique airports
  const airports = routes.reduce((acc, route) => {
    if (!acc.includes(route.start)) {
      acc.push(route.start);
    }
    if (!acc.includes(route.end)) {
      acc.push(route.end);
    }
    return acc;
  }, [] as string[]);

  airports.forEach((airport) => {
    graph.addVertex(airport);
  });

  routes.forEach((route) => {
    graph.addEdge(route.start, route.end, { weight: route.length });
  });

  return graph.calculateShortestPath(from, to).finalPath;
};

// TODO: memoize the dijkstra calculator graph, we should only compute that once probably
// idk maybe its cheap
