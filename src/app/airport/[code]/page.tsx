import styles from "@/app/page.module.css";

export default function Airport({ params }: { params: { code: string } }) {
  return (
    <main className={styles.main}>
      <h1>Airport tracker!</h1>
      <p>This is the one for {params.code}.</p>
    </main>
  );
}
