import Location from "@/components/Location";
import Pagination from "@/components/Pagination";
import styles from "@/styles/pages/Home.module.scss";
import { LocationData } from "@/utils/types";
import { GetServerSideProps } from "next";
import { useState } from "react";

let PageSize = 20;

export default function Home({ totalItems, results }: LocationData) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <div className={styles.locationList}>
        {results.length > 0 ? (
          results?.map((result) => <Location key={result.id} result={result} />)
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={totalItems}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
}
export const getServerSideProps: GetServerSideProps<LocationData> = async (
  context
) => {
  const { page } = context.query;
  const res = await fetch(`${process.env.BASE_URL}/location?page=${page}`);
  const data = await res.json();

  return {
    props: {
      totalItems: data.info.count,
      results: data.results,
    },
  };
};
