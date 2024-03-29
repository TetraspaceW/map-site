import styles from "@/app/page.module.css";

export default function Person({ params }: { params: { name: string } }) {
  return (
    <main className={styles.main}>
      <h1>Person tracker!</h1>
      <p>This is the one for {params.name}.</p>
    </main>
  );
}
