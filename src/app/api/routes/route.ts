import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const { SUPABASE_ENDPOINT, SUPABASE_TOKEN } = process.env;
  if (SUPABASE_ENDPOINT && SUPABASE_TOKEN) {
    const client = createClient(SUPABASE_ENDPOINT, SUPABASE_TOKEN);

    const { data: routes, error } = await client
      .from("route")
      .select("start,end,length");

    if (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }

    return Response.json({ routes });
  }
  return new Response("SUPABASE_ENDPOINT not set.", { status: 500 });
}
