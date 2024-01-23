"use client";

import { fetcher } from "@/app/helpers/fetcher";
import styles from "@/app/page.module.css";
import useSWR from "swr";
import { Node } from "@/app/types/MapTypes";
import Link from "next/link";

type Girlthing = Node & { distance: number };

type GirlthingsResponse = {
  nodesAtNearestAirport: Girlthing[];
  nodesAwayFromNearestAirport: Girlthing[];
};

export default function Airport({ params }: { params: { code: string } }) {
  const { data, error, isLoading } = useSWR(
    `/api/locations/airport/${params.code}`,
    fetcher("", "")
  );
  const girlthings: GirlthingsResponse = data;

  return (
    <main className={styles.main}>
      <h1>Airport tracker!</h1>
      <p>This is the one for {params.code}.</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {girlthings.nodesAtNearestAirport && (
            <>
              <h2>Girlthings Near {params.code}</h2>
              <ul>
                {girlthings.nodesAtNearestAirport.map((node) => (
                  <li key={node.user_id}>
                    <p>
                      {node.user_name} ({node.distance.toFixed(0)} miles away)
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
          {girlthings.nodesAwayFromNearestAirport && (
            <>
              <h2>Other Girlthings</h2>
              <ul>
                {girlthings.nodesAwayFromNearestAirport.map((node) => (
                  <li key={node.user_id}>
                    <p>
                      {node.user_name} (closer to{" "}
                      <Link href={`/airport/${node.nearest_airport}`}>
                        {node.nearest_airport}
                      </Link>
                      )
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </main>
  );
}
