import React from "react";
import classNames from "classnames";
import styles from "./error.module.scss";

type PropsType = {
  header: string;
  message: string;
  className?: string;
};

const Error = ({ header, message, className = '' }: PropsType) => (
  <div className={classNames(styles.error, className)}>
    <h3 className={styles['error__header']}>
      {header}
    </h3>
    <span>{message}</span>
  </div>
);

export default Error;
