"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";
import styles from "./styles.module.css";

export const EmbeddedMap = () => {
  const loader = new Loader({
    apiKey: process.env.GOOGLE_MAPS_KEY ?? "",
    version: "weekly",
  });

  useEffect(() => {
    loader.importLibrary("maps").then(async ({ Map }) => {
      new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  });

  return <div id="map" className={styles.map}></div>;
};
