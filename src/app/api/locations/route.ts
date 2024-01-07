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
      .select("user_id,user_name,nearest_airport,location");

    if (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }

    return Response.json({
      locations,
    });
  }
  return new Response("SUPABASE_ENDPOINT not set.", { status: 500 });
}
