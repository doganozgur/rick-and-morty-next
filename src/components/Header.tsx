import Image from "next/image";
import styles from "../styles/layout/Header.module.scss";
import Logo from "../../public/logo.svg";
import Link from "next/link";
import ReturnImg from "../../public/back.svg";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <header className={styles.header}>
      <button
        className={styles.backBtn}
        style={{ display: `${pathname !== "/" ? "block" : "none"}` }}
        onClick={() => router.back()}
      >
        <Image src={ReturnImg} alt="Go back" />
      </button>
      <Link href="/">
        <Image src={Logo} alt="Picture of the author" className={styles.logo} />
      </Link>
    </header>
  );
};
export default Header;
