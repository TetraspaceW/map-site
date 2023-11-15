import styles from "./page.module.css";
import { EmbeddedMap } from "./components/EmbeddedMap";

export default function Home() {
  return (
    <main className={styles.main}>
      <EmbeddedMap />
    </main>
  );
}
