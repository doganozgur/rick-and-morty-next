import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/components/Pagination.module.scss";

type Props = {
  itemsPerPage: number;
  totalItems: number;
};

const Pagination = ({ itemsPerPage, totalItems }: Props) => {
  const router = useRouter();
  const pageNumbers = [];
  const { page } = router.query;

  // Push page numbers to an array
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      {/* Previous button */}
      <li>
        {Number(page) > 1 ? (
          <Link
            style={{
              pointerEvents: `${Number(page) < 2 ? "none" : "auto"}`,
            }}
            href={`?page=${Number(page) > 1 && Number(page) - 1}`}
          >
            {"<"}
          </Link>
        ) : (
          ""
        )}
      </li>
      {pageNumbers.map((number) => (
        <li key={number}>
          <Link
            className={Number(page) === number ? "active" : ""}
            href={`?page=${number}`}
          >
            {number}
          </Link>
        </li>
      ))}
      {/* Next button */}
      <li>
        {Number(page) !== pageNumbers.length ? (
          <Link
            href={`?page=${
              Number(page) < pageNumbers.length ? Number(page) + 1 : "#"
            }`}
          >
            {">"}
          </Link>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
};
export default Pagination;
