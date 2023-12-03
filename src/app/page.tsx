"use client";

import styles from "./page.module.css";
import { EmbeddedMap } from "./components/EmbeddedMap";

import useSWR from "swr";
import { ErrorMessage } from "./components/ErrorMessage";
import { AppError } from "./types/ErrorTypes";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

export default function Home() {
  const {
    data: locationData,
    error: locationError,
    isLoading: locationIsLoading,
  } = useSWR("/api/locations", fetcher);
  const {
    data: airportData,
    error: airportError,
    isLoading: airportIsLoading,
  } = useSWR("api/airports", fetcher);
  const {
    data: routeData,
    error: routeError,
    isLoading: routeIsLoading,
  } = useSWR("api/airports", fetcher);
  // TODO: this is starting to get a bit embarrasing, why is it repeated thrice
  const nodes = locationData?.locations ?? [];
  const airports = airportData?.airports ?? [];
  const routes = routeData?.routes ?? [];

  return (
    <main className={styles.main}>
      {locationError || airportError || routeError ? (
        <ErrorMessage message={AppError.LocationFetchError} />
      ) : (
        <EmbeddedMap
          nodes={nodes}
          airports={airports}
          routes={routes}
          loaded={!(airportIsLoading || locationIsLoading || routeIsLoading)}
        />
      )}
    </main>
  );
}
