import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const { SUPABASE_ENDPOINT, SUPABASE_TOKEN } = process.env;
  if (SUPABASE_ENDPOINT && SUPABASE_TOKEN) {
    const client = createClient(SUPABASE_ENDPOINT, SUPABASE_TOKEN);
    const { data: locations, error } = await client
      .from("location")
      .select("location,user_name");

    if (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }

    return Response.json({
      locations,
    });
  }
  return new Response("SUPABASE_ENDPOINT not set.", { status: 500 });
}
