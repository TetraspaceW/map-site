import { createClient } from "@supabase/supabase-js";
import mockLocationResponse from "../mocks/mockLocationResponse.json";
import { getFlight } from "../flight/route";
import { Pin } from "@/app/types/MapTypes";

export async function GET() {
  if (process.env.USE_MOCKS) {
    return Response.json(mockLocationResponse);
  }

  const { SUPABASE_ENDPOINT, SUPABASE_TOKEN } = process.env;
  if (SUPABASE_ENDPOINT && SUPABASE_TOKEN) {
    const client = createClient(SUPABASE_ENDPOINT, SUPABASE_TOKEN);
    const { data: locations, error } = await client
      .from("location")
      .select("location,user_name");

    if (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }

    const output: Pin[] = await Promise.all(
      locations.map(async ({ location, user_name }) => {
        if (location.Flight) {
          const flight = await getFlight(location.Flight.id);
          const { lat, lng } = (await flight.json()).response;
          return {
            user_name,
            location: coordinatesToString({ lat, lng }),
            type: "flight",
          };
        } else {
          const { lat, lng } = location.Coordinates;
          return {
            user_name,
            location: coordinatesToString({ lat, lng }),
            type: "coordinates",
          };
        }
      })
    );

    return Response.json({
      locations: output,
    });
  }
  return new Response("SUPABASE_ENDPOINT not set.", { status: 500 });
}

const coordinatesToString = ({ lat, lng }: { lat: string; lng: string }) => ({
  lat: Number(lat),
  lng: Number(lng),
});
