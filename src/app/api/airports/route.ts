import { withSupabaseClient } from "../helpers";

export async function GET() {
  return await withSupabaseClient(async (client) => {
    const { data: airports, error } = await client
      .from("airport")
      .select("code,name,location");

    if (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }

    return Response.json({ airports });
  });
}
