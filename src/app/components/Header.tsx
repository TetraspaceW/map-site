import { createClient } from "@supabase/supabase-js";

type HeaderProps = {};

const loginWithDiscord = async (
  supabaseEndpoint: string,
  supabaseToken: string
) => {
  const supabase = createClient(supabaseEndpoint ?? "", supabaseToken ?? "");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
  });
};

export const Header = ({}: HeaderProps) => {
  return (
    <div>
      <button
        onClick={() =>
          loginWithDiscord(
            process.env.SUPABASE_ENDPOINT ?? "",
            process.env.SUPABASE_ANON_TOKEN ?? ""
          )
        }
      >
        Login
      </button>
    </div>
  );
};
