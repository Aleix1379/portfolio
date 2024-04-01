import React, { useState } from "react";
import styles from "../styles/Input.module.css";
import type { Validation } from "../types/Validation";

interface InputProps {
  testID?: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  type?: "text" | "textarea" | "email";
  className?: string | undefined;
  validation?: Validation;
}

const Input: React.FC<InputProps> = ({
  testID = "",
  label,
  value,
  placeholder,
  onChange,
  type = "text",
  className,
  validation,
}) => {
  const [isLabelActive, setIsLabelActive] = useState(false);

  const getAnimationDelay = (index: number): string => {
    const time = 0.05;
    if (!isLabelActive) {
      index = index * -1;
    }
    return index * time + "s";
  };

  const isValid = () => {
    return !(validation?.touched && validation.message.length > 0);
  };

  return (
    <label className={`${styles.container} ${className}`}>
      <div className={styles.label}>
        {label.split("").map((letter, index) => (
          <span
            key={index}
            className={`${styles.letter} ${isLabelActive ? styles.animated : ""}`}
            style={{
              animationDelay: getAnimationDelay(index),
              color: isValid() ? "#38c188" : "#c0392b",
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      {type !== "textarea" && (
        <div>
          <div
            className={`${styles.inputWrapper}  ${isLabelActive ? styles.borderWrapper : ""}`}
            style={{ borderColor: isValid() ? "#38c188" : "#c0392b" }}
          >
            <input
              data-testid={testID}
              className={styles.input}
              type={type}
              placeholder={isLabelActive ? placeholder : ""}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsLabelActive(true)}
              onBlur={() => setIsLabelActive(value.length > 0)}
            />
          </div>
          {validation?.touched && validation.message.length > 0 && (
            <div className={styles.error}>{validation.message}</div>
          )}
        </div>
      )}
      {type === "textarea" && (
        <div>
          <div
            className={`${styles.textareaWrapper} ${isLabelActive ? styles.borderWrapper : ""}`}
            style={{ borderColor: isValid() ? "#38c188" : "#c0392b" }}
          >
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder={isLabelActive ? placeholder : ""}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsLabelActive(true)}
              onBlur={() => setIsLabelActive(value.length > 0)}
            />
          </div>
          {validation?.touched && validation.message.length > 0 && (
            <div className={styles.error}>{validation.message}</div>
          )}
        </div>
      )}
    </label>
  );
};

export default Input;
