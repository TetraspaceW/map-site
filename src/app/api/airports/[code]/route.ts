import { withSupabaseClient } from "../../helpers";

export async function GET(
  _: Request,
  { params }: { params: { code: string } }
) {
  return await withSupabaseClient(async (client) => {
    const { code } = params;
    const { data: airports, error: error } = await client
      .from("airport")
      .select("*")
      .eq("code", code);

    if (error) {
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    }

    return Response.json({ airport: airports[0] });
  });
}
