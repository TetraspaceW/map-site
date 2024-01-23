"use client";

import styles from "@/app/page.module.css";
import { Airport, Node } from "@/app/types/MapTypes";
import Link from "next/link";
import { useMultipleApiData } from "@/app/helpers/useMultipleAPIData";

type Girlthing = Node & { distance: number };

type GirlthingsResponse = {
  nodesAtNearestAirport: Girlthing[];
  nodesAwayFromNearestAirport: Girlthing[];
};

const GirlthingsList = ({
  girlthings,
  ListItem,
}: {
  girlthings: Girlthing[];
  ListItem: ({ girlthing }: { girlthing: Girlthing }) => JSX.Element;
}) => {
  return (
    <ul>
      {girlthings.map((girlthing) => (
        <ListItem key={girlthing.user_id} girlthing={girlthing} />
      ))}
    </ul>
  );
};

const GirlthingEntry = ({
  girlthing,
  isNear,
}: {
  girlthing: Girlthing;
  isNear: boolean;
}) => {
  return (
    <li>
      {isNear ? (
        <p>
          {girlthing.user_name} ({girlthing.distance.toFixed(0)} miles away){" "}
        </p>
      ) : (
        <p>
          {girlthing.user_name} (closer to{" "}
          <Link href={`/airport/${girlthing.nearest_airport}`}>
            {girlthing.nearest_airport}
          </Link>
          )
        </p>
      )}
    </li>
  );
};

export default function Airport({ params }: { params: { code: string } }) {
  const {
    data: [girlthingData, airportData],
    error,
    isLoading,
  } = useMultipleApiData(
    "",
    ""
  )([`/api/locations/airport/${params.code}`, `/api/airports/${params.code}`]);

  const girlthings: GirlthingsResponse = girlthingData;
  const airport: Airport = airportData?.airport;

  const { nodesAtNearestAirport, nodesAwayFromNearestAirport } =
    girlthings || {};

  if (isLoading) {
    return (
      <main className={styles.main}>
        <p>Loading...</p>
      </main>
    );
  }

  if (!airport) {
    return (
      <main className={styles.main}>
        <p>Could not find airport with code {params.code}.</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>Airport tracker!</h1>
      <p>
        This is the one for {airport.name} ({airport.code}).
      </p>
      {nodesAtNearestAirport && (
        <>
          <h2>Girlthings Near {airport.name}</h2>
          <GirlthingsList
            girlthings={nodesAtNearestAirport}
            ListItem={(props) => <GirlthingEntry {...props} isNear />}
          />
        </>
      )}
      {nodesAwayFromNearestAirport && (
        <>
          <h2>Other Girlthings</h2>
          <GirlthingsList
            girlthings={nodesAwayFromNearestAirport}
            ListItem={(props) => <GirlthingEntry {...props} isNear={false} />}
          />
        </>
      )}
    </main>
  );
}
