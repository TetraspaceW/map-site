"use client";

import styles from "./page.module.css";
import { EmbeddedMap } from "./components/EmbeddedMap";

import useSWR from "swr";
import { ErrorMessage } from "./components/ErrorMessage";
import { AppError } from "./types/ErrorTypes";
import { Pin } from "./types/MapTypes";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/locations", fetcher);
  const locations = data?.locations;
  const pins: Pin[] = locations;

  return (
    <main className={styles.main}>
      {error ? (
        <ErrorMessage message={AppError.LocationFetchError} />
      ) : (
        <EmbeddedMap locations={pins} locationsLoaded={!isLoading} />
      )}
    </main>
  );
}
