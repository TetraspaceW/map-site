import { createClient } from "@supabase/supabase-js";

type HeaderProps = {
  SUPABASE_ENDPOINT?: string;
  SUPABASE_ANON_TOKEN?: string;
};

const loginWithDiscord = async (
  supabaseEndpoint: string,
  supabaseToken: string
) => {
  const supabase = createClient(supabaseEndpoint ?? "", supabaseToken ?? "");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
  });
};

export async function getStaticProps() {
  const { SUPABASE_ENDPOINT, SUPABASE_ANON_TOKEN } = process.env;

  console.log("Endpoint: ", SUPABASE_ENDPOINT);
  console.log("Token:", SUPABASE_ANON_TOKEN);

  return {
    props: {
      SUPABASE_ENDPOINT,
      SUPABASE_ANON_TOKEN,
    },
  };
}

export const Header = ({
  SUPABASE_ENDPOINT,
  SUPABASE_ANON_TOKEN,
}: HeaderProps) => {
  console.log("Endpoint in Header: ", SUPABASE_ENDPOINT);
  console.log("Token in Header:", SUPABASE_ANON_TOKEN);

  return (
    <div>
      <button
        onClick={() =>
          loginWithDiscord(SUPABASE_ENDPOINT ?? "", SUPABASE_ANON_TOKEN ?? "")
        }
      >
        Login
      </button>
    </div>
  );
};
