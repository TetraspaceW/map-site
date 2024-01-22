import styles from "@/app/page.module.css";

export default function Resource({ params }: { params: { name: string } }) {
  return (
    <main className={styles.main}>
      <h1>Resource tracker!</h1>
      <p>This is the one for {params.name}.</p>
    </main>
  );
}
