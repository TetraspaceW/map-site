import { createClient } from "@supabase/supabase-js";
import mockLocationResponse from "../mocks/mockLocationResponse.json";

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

    const cleaned_locations = locations.map(clean);

    return Response.json({
      locations: cleaned_locations,
    });
  }
  return new Response("SUPABASE_ENDPOINT not set.", { status: 500 });
}

const clean = (pin: any) => {
  const { location, user_name } = pin;
  return {
    user_name: `${user_name}`,
    location: { lat: Number(location.lat), lng: Number(location.lng) },
  };
};
