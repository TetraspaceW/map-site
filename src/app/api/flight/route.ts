import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request?.nextUrl?.searchParams;
  const flightID = searchParams.get("id");
  if (!flightID) {
    return new Response("Flight ID not included", { status: 400 });
  } else {
    return await getFlight(flightID);
  }
}

export const getFlight = async (flightID: string) => {
  const res = await fetch(
    `https://airlabs.co/api/v9/flight?&api_key=${process.env.FLIGHTLABS_KEY}&flight_iata=${flightID}`
  );

  const { response } = await res.json();

  return Response.json({ response });
};
