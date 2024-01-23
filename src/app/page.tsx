"use client";
import { useSearchParams } from "next/navigation";

import { EmbeddedMap, EmbeddedMapDisplay } from "./components/EmbeddedMap";
import { ErrorMessage } from "./components/ErrorMessage";
import { AppError } from "./types/ErrorTypes";

import styles from "./page.module.css";
import { useMultipleApiData } from "./helpers/useMultipleAPIData";

const Home = () => {
  const searchParams = useSearchParams();
  const display = (searchParams.get("display") ?? "map") as EmbeddedMapDisplay;

  const {
    data: [locationData, airportData, routeData],
    error,
    isLoading,
  } = useMultipleApiData(
    "",
    ""
  )(["/api/locations", "/api/airports", "/api/routes"]);

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
