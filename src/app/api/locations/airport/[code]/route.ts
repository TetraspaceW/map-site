import { withSupabaseClient } from "@/app/api/helpers";
import { NodeLocation } from "@/app/types/MapTypes";
import { GET as getAirport } from "@/app/api/airports/[code]/route";

import haversine from "s-haversine";

const METERS_IN_MILE = 1609.34;

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  return await withSupabaseClient(async (client) => {
    const { code } = params;

    const { data: locations, error: locationsError } = await client
      .from("location")
      .select("user_id,user_name,nearest_airport,location");

    if (locationsError) {
      return new Response(JSON.stringify(locationsError), {
        status: 500,
      });
    }

    const airportResponse = await getAirport(req, { params });
    if (airportResponse.status != 200) {
      return airportResponse;
    }
    const { airport } = await airportResponse.json();
    const airportLocation: NodeLocation = airport.location;

    const augmentedLocations = locations?.map((location) => {
      return {
        distance: calculateDistance(location.location, airportLocation),
        ...location,
      };
    });

    const returnValue = augmentedLocations?.reduce(
      (acc, location) => {
        if (location.nearest_airport == code) {
          acc.nodesAtNearestAirport.push(location);
        } else {
          acc.nodesAwayFromNearestAirport.push(location);
        }
        return acc;
      },
      {
        nodesAtNearestAirport: [] as any[],
        nodesAwayFromNearestAirport: [] as any[],
      }
    );

    return Response.json(returnValue);
  });
}

const calculateDistance = (node: NodeLocation, port: NodeLocation) => {
  return (
    haversine.distance([node.lat, node.lng], [port.lat, port.lng]) /
    METERS_IN_MILE
  );
};
