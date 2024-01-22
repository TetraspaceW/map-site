import { NodeLocation } from "@/app/types/MapTypes";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest } from "next";

import haversine from "s-haversine";

const METERS_IN_MILE = 1609.34;

export async function GET(
  _: Request,
  { params }: { params: { code: string } }
) {
  const { SUPABASE_ENDPOINT, SUPABASE_TOKEN } = process.env;
  if (SUPABASE_ENDPOINT && SUPABASE_TOKEN) {
    const { code } = params;

    const client = createClient(SUPABASE_ENDPOINT, SUPABASE_TOKEN);
    const { data: locations, error: locationsError } = await client
      .from("location")
      .select("user_id,user_name,nearest_airport,location");
    const { data: airports, error: airportsError } = await client
      .from("airport")
      .select("*")
      .eq("code", code);

    const airportLocation: NodeLocation = airports?.[0].location;

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

    if (locationsError || airportsError) {
      return new Response(JSON.stringify(locationsError || airportsError), {
        status: 500,
      });
    }

    return Response.json(returnValue);
  }
  return new Response("SUPABASE_ENDPOINT not set.", { status: 500 });
}

const calculateDistance = (node: NodeLocation, port: NodeLocation) => {
  return (
    haversine.distance([node.lat, node.lng], [port.lat, port.lng]) /
    METERS_IN_MILE
  );
};
