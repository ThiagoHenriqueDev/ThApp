import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
}

export default Button;
