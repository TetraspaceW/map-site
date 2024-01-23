import { withSupabaseClient } from "../helpers";

export async function GET() {
  return await withSupabaseClient(async (client) => {
    const { data: routes, error } = await client
      .from("route")
      .select("start,end,length");

    if (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }

    return Response.json({ routes });
  });
}
