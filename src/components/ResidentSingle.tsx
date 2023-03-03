import { Resident } from "@/utils/types";
import Image from "next/image";

type Props = {
  data: Resident;
};

const ResidentSingle = ({ data }: Props) => {
  const { id, name, status, species, image } = data;
  return (
    <article>
      <h2>{name}</h2>
      <p>{status}</p>
      <Image src={image} alt="" width={336} height={336} />
    </article>
  );
};
export default ResidentSingle;
