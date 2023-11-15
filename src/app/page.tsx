import styles from "./page.module.css";
import { EmbeddedMap } from "./components/EmbeddedMap";
import { GET } from "./api/locations/route";
import { Pin } from "./types/MapTypes";

export default async function Home() {
  // i know i know
  // fixing it later
  const locations: Pin[] = (await (await GET()).json()).locations.map(
    ({
      location: { lat, lng },
      user_name,
    }: {
      location: { lat: string; lng: string };
      user_name: string;
    }) => ({
      location: { lat: Number(lat), lng: Number(lng) },
      user_name,
    })
  );

  return (
    <main className={styles.main}>
      <EmbeddedMap locations={locations} />
    </main>
  );
}
