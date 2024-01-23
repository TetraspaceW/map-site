import mockLocationResponse from "../mocks/mockLocationResponse.json";
import { withSupabaseClient } from "../helpers";

export async function GET() {
  if (process.env.USE_MOCKS) {
    return Response.json(mockLocationResponse);
  }

  return await withSupabaseClient(async (client) => {
    const { data: locations, error } = await client
      .from("location")
      .select("user_id,user_name,nearest_airport,location");

    if (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }

    return Response.json({
      locations,
    });
  });
}
