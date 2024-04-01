import React from "react";
import styles from "../styles/Button.module.css";

export interface ButtonProps {
  children: string;
  onClick: () => void;
  className?: string | undefined;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
