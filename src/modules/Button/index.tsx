import React, { MouseEvent } from "react";
import classnames from "classnames";
import styles from "./button.module.scss";

type PropsType = {
  className?: string;
  type?: 'submit' | 'reset' | 'button' | 'like' | 'load';
  text?: string;
  isLoading?: boolean;
  isLiked?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ className = '', type = 'button', text = '', isLoading = false, isLiked = false, onClick }: PropsType) => {
  return isLoading ? <div className={classnames(styles.loading, className)} /> : (
    <button
      className={classnames(styles.btn, styles[`btn--${type}`], isLiked && styles['btn--liked'], className)}
      type={type === 'submit' || type === 'reset' ? type : 'button'}
      onClick={onClick}
    >
      {text}
    </button>
  )
};

export default Button;
