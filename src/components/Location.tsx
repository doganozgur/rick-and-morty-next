import { Location } from "@/utils/types";
import Link from "next/link";
import styles from "../styles/layout/Location.module.scss";

type Props = {
  result: Location;
};

const Location: React.FC<Props> = ({ result }) => {
  const { id, name, dimension, type, residents } = result;

  return (
    <article className={styles.location}>
      <Link href={`locations/${id}`}>
        <h2 className={styles.title}>{name}</h2>
        <ul className={styles.content}>
          <li>
            <span>Type</span>
            <span>: {type}</span>
          </li>
          <li>
            <span>Dimension</span>
            <span>: {dimension}</span>
          </li>
          <li>
            <span>Resident count</span>
            <span>: {residents.length}</span>
          </li>
        </ul>
      </Link>
    </article>
  );
};
export default Location;
