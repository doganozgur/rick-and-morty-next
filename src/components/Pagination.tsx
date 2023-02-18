import Link from "next/link";
import styles from "../styles/components/Pagination.module.scss";
import { usePagination, DOTS } from "../hooks/usePagination";

type Props = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

const Pagination: React.FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles.pagination}>
      {/* Left navigation arrow */}
      <li onClick={() => onPageChange(currentPage - 1)}>
        {currentPage > 1 ? (
          <Link
            style={{
              pointerEvents: `${currentPage < 2 ? "none" : "auto"}`,
            }}
            href={`?page=${currentPage > 1 && currentPage - 1}`}
          >
            {"<"}
          </Link>
        ) : (
          ""
        )}
      </li>
      {paginationRange?.map((pageNumber, idx) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li
              key={pageNumber}
              style={{ display: "flex", alignItems: "center" }}
            >
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li key={pageNumber} onClick={() => onPageChange(Number(pageNumber))}>
            <Link
              href={`?page=${pageNumber}`}
              className={`${currentPage === pageNumber ? "active" : ""}`}
            >
              {pageNumber}
            </Link>
          </li>
        );
      })}
      {/* Next button */}
      <li onClick={() => onPageChange(currentPage + 1)}>
        {currentPage !== lastPage ? (
          <Link href={`?page=${currentPage + 1}`}>{">"}</Link>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
};
export default Pagination;
