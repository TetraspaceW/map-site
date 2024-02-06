"use client";

import styles from "@/app/page.module.css";
import { Airport, Node } from "@/app/types/MapTypes";
import Link from "next/link";
import { useMultipleApiData } from "@/app/helpers/useMultipleAPIData";

type Operative = Node & { distance: number };

type OperativesResponse = {
  nodesAtNearestAirport: Operative[];
  nodesAwayFromNearestAirport: Operative[];
};

const OperativesList = ({
  operatives,
  ListItem,
}: {
  operatives: Operative[];
  ListItem: ({ operative }: { operative: Operative }) => JSX.Element;
}) => {
  return (
    <ul>
      {operatives.map((operative) => (
        <ListItem key={operative.user_id} operative={operative} />
      ))}
    </ul>
  );
};

const OperativeEntry = ({
  operative,
  isNear,
}: {
  operative: Operative;
  isNear: boolean;
}) => {
  return (
    <li>
      {isNear ? (
        <p>
          {operative.user_name} ({operative.distance.toFixed(0)} miles away){" "}
        </p>
      ) : (
        <p>
          {operative.user_name} (closer to{" "}
          <Link href={`/airport/${operative.nearest_airport}`}>
            {operative.nearest_airport}
          </Link>
          )
        </p>
      )}
    </li>
  );
};

export default function Airport({ params }: { params: { code: string } }) {
  const {
    data: [operativeData, airportData],
    error,
    isLoading,
  } = useMultipleApiData(
    "",
    ""
  )([`/api/locations/airport/${params.code}`, `/api/airports/${params.code}`]);

  const operatives: OperativesResponse = operativeData;
  const airport: Airport = airportData?.airport;

  const { nodesAtNearestAirport, nodesAwayFromNearestAirport } =
    operatives || {};

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
          <h2>Operatives Near {airport.name}</h2>
          <OperativesList
            operatives={nodesAtNearestAirport}
            ListItem={(props) => <OperativeEntry {...props} isNear />}
          />
        </>
      )}
      {nodesAwayFromNearestAirport && (
        <>
          <h2>Other Operatives</h2>
          <OperativesList
            operatives={nodesAwayFromNearestAirport}
            ListItem={(props) => <OperativeEntry {...props} isNear={false} />}
          />
        </>
      )}
    </main>
  );
}
