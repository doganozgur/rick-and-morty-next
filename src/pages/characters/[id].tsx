import { Character } from "@/utils/types";
import { GetServerSideProps } from "next";
import Image from "next/image";
import styles from "../../styles/pages/CharacterDetails.module.scss";

type Props = {
  details: Character;
};
const CharacterDetails = ({ details }: Props) => {
  const { name, status, species, type, gender, image, location } = details;

  return (
    <article className={styles.detailsCart}>
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
      <div className={styles.additionalInfos}>
        <span className={styles.location}>{location}</span>
        <span className={styles.gender}>
          {type} {type && "-"} {gender}
        </span>
      </div>
    </article>
  );
};
export default CharacterDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`${process.env.BASE_URL}/character/${id}`);
  const data = await res.json();

  return {
    props: {
      details: {
        id: data.id,
        name: data.name,
        status: data.status,
        species: data.species,
        type: data.type,
        gender: data.gender,
        image: data.image,
        location: data.location.name,
      },
    },
  };
};
