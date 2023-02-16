import Location from "@/components/Location";
import styles from "@/styles/pages/Home.module.scss";
import { LocationData } from "@/utils/types";

export default function Home({ info, results }: LocationData) {
  return (
    <div className={styles.locationList}>
      {results.length > 0 ? (
        results.map((result) => <Location key={result.id} result={result} />)
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/location`);
  const data = await res.json();

  return {
    props: {
      info: data.info,
      results: data.results,
    },
  };
}
