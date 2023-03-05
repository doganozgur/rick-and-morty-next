import { Resident } from "@/utils/types";
import { GetServerSideProps } from "next";
import { useState } from "react";

import Pagination from "@/components/Pagination";
import CharacterSingle from "@/components/CharacterSingle";
import styles from "../../styles/pages/Locations.module.scss";
import { fetchCharacters } from "../../utils/fetchCharacters";

type Props = {
  result: Resident[];
  totalCount: number;
};

const LocationDetails = ({ result, totalCount }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section>
      {result.length > 0 ? (
        <>
          <div className={styles.charactersHolder}>
            {result?.map((item) => (
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
  let page = 1;
  page = Number(context.query.page ? context.query.page : 1);

  const { id } = context.query;

  const locationResponse = await fetch(
    `${process.env.BASE_URL}/location/${id}`
  );
  const locationData = await locationResponse.json();

  let prevPage, nextPage;

  if (page) {
    if (Number(page) === 1) {
      prevPage = 0;
      nextPage = 1 * 4;
    } else {
      prevPage = (Number(page) - 1) * 4;
      nextPage = Number(page) * 4;
    }
  }

  const result = await Promise.all(
    locationData.residents
      .slice(prevPage, nextPage)
      .map((url: string) => fetchCharacters(url))
  );
  const totalCount = locationData?.residents.length;

  return {
    props: {
      result,
      totalCount,
    },
  };
};
