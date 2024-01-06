"use client";

import styles from "./page.module.css";
import { EmbeddedMap } from "./components/EmbeddedMap";

import useSWR from "swr";
import { ErrorMessage } from "./components/ErrorMessage";
import { AppError } from "./types/ErrorTypes";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const useMultipleApiData = (endpoints: string[]) => {
    const useApiData = (endpoint: string) => useSWR(endpoint, fetcher);
    const response = endpoints.map(useApiData);
    return response.reduce(
      (acc, curr) => {
        return {
          data: [...acc.data, curr.data],
          error: acc.error || curr.error,
          isLoading: acc.isLoading || curr.isLoading,
        };
      },
      { data: [] as any[], error: null as any, isLoading: false }
    );
  };

  const {
    data: [locationData, airportData, routeData],
    error,
    isLoading,
  } = useMultipleApiData(["/api/locations", "/api/airports", "/api/routes"]);

  const nodes = locationData?.locations ?? [];
  const airports = airportData?.airports ?? [];
  const routes = routeData?.routes ?? [];

  return (
    <main className={styles.main}>
      {error ? (
        <ErrorMessage message={AppError.LocationFetchError} />
      ) : (
        <EmbeddedMap
          nodes={nodes}
          airports={airports}
          routes={routes}
          loaded={!isLoading}
        />
      )}
    </main>
  );
}
