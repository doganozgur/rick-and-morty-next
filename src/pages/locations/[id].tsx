import ResidentSingle from "@/components/ResidentSingle";
import { Resident } from "@/utils/types";
import { GetServerSideProps } from "next";

type Props = {
  results: Resident[];
  totalCount: number;
};

const LocationDetails = ({ results, totalCount }: Props) => {
  return (
    <div>
      {results.length > 0 ? (
        results?.map((item) => <ResidentSingle key={item.id} data={item} />)
      ) : (
        <div>No characters found...</div>
      )}
    </div>
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
