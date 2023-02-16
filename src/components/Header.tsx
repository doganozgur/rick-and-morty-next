import Image from "next/image";
import styles from "../styles/layout//Header.module.scss";
import Logo from "../../public/logo.svg";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={Logo} alt="Picture of the author" className={styles.logo} />
      </Link>
    </header>
  );
};
export default Header;
