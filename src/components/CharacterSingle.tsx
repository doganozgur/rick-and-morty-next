import { Resident } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/pages/CharacterSingle.module.scss";

type Props = {
  data: Resident;
};

const CharacterSingle = ({ data }: Props) => {
  const { id, name, status, species, image } = data;

  return (
    <article>
      <Link href={`/characters/${id}`}>
        <Image
          className={styles.characterImg}
          src={image}
          alt={name}
          width={336}
          height={336}
        />
        <h1 className={styles.title}>{name}</h1>
        <p className={`${styles.meta} ${status.toLowerCase()}`}>
          {status} - {species}
        </p>
      </Link>
    </article>
  );
};
export default CharacterSingle;
