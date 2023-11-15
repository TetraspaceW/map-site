import styles from "./page.module.css";
import { EmbeddedMap } from "./components/EmbeddedMap";
import { GET } from "./api/locations/route";
import { Pin } from "./types/MapTypes";

export default async function Home() {
  // i know i know
  // fixing it later
  const locations: Pin[] = (await (await GET()).json()).locations;

  return (
    <main className={styles.main}>
      <EmbeddedMap locations={locations} />
    </main>
  );
}
