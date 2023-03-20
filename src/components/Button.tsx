import { ButtonEnums } from "@/utils/types";
import { ReactNode } from "react";
import styles from "../styles/components/Button.module.scss";

type Props = {
  variant: ButtonEnums;
  children: ReactNode;
};

const Button = ({ variant, children }: Props) => {
  return (
    <div className={styles.button}>
      <button className={styles[variant]}>{children}</button>
    </div>
  );
};
export default Button;
