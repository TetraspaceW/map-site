import { SupabaseClient, createClient } from "@supabase/supabase-js";

export const withSupabaseClient = async (
  func: (client: SupabaseClient) => Promise<Response>
) => {
  const { SUPABASE_ENDPOINT, SUPABASE_TOKEN } = process.env;

  if (SUPABASE_ENDPOINT && SUPABASE_TOKEN) {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_TOKEN);
    return await func(supabase);
  } else {
    return new Response("Missing Supabase credentials", {
      status: 500,
    });
  }
};
