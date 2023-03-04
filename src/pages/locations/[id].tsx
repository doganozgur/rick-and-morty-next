import Pagination from "@/components/Pagination";
import CharacterSingle from "@/components/CharacterSingle";
import { Resident } from "@/utils/types";
import { GetServerSideProps } from "next";
import { useState } from "react";
import styles from "../../styles/pages/Locations.module.scss";

type Props = {
  results: Resident[];
  totalCount: number;
};

const LocationDetails = ({ results, totalCount }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section>
      {results.length > 0 ? (
        <>
          <div className={styles.charactersHolder}>
            {results?.map((item) => (
              <CharacterSingle key={item.id} data={item} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={4}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </>
      ) : (
        <div>No characters found...</div>
      )}
    </section>
  );
};

export default LocationDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { page } = context.query;
  const res = await fetch(
    page
      ? `${process.env.LOCAL_API_URL}/location/${id}?page=${page}`
      : `${process.env.LOCAL_API_URL}/location/${id}?page=1`
  );
  const data = await res.json();

  return {
    props: {
      results: data.results,
      totalCount: data.totalCount,
    },
  };
};
