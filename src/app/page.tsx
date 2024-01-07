"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";

import { EmbeddedMap, EmbeddedMapDisplay } from "./components/EmbeddedMap";
import { ErrorMessage } from "./components/ErrorMessage";
import { AppError } from "./types/ErrorTypes";
import { Header } from "./components/Header";

import styles from "./page.module.css";

const accessToken = "";
const refreshToken = "";
const fetcher = (url: string) =>
  fetch(url, {
    headers: { access_token: accessToken, refresh_token: refreshToken },
  }).then((res) => res.json());

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

const Home = () => {
  const searchParams = useSearchParams();
  const display = (searchParams.get("display") ?? "map") as EmbeddedMapDisplay;

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
          display={display}
        />
      )}
    </main>
  );
};

export default Home;
