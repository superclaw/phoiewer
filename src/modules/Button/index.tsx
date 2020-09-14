import React from "react";
import classnames from "classnames";
import styles from "./button.module.scss";

type PropsType = {
  className?: string;
  type?: 'submit' | 'reset' | 'button' | 'like' | 'load' | 'download';
  text?: string;
  isLoading?: boolean;
  isLiked?: boolean;
  id?: string;
  width?: string;
  onClick?: any;
  onFocus?: any;
  onBlur?: any;
};

const Button = ({
                  className = '',
                  type = 'button',
                  text = '',
                  isLoading = false,
                  isLiked = false,
                  id,
                  width,
                  onClick,
                  onFocus,
                  onBlur
}: PropsType) =>
  isLoading ? <div className={classnames(styles.loading, className)} /> : type === 'download' ? (
    <a
      href={`https://unsplash.com/photos/${id}/download?force=true${width ? `&=${(() => {
        switch (width) {
          case 'small':
            return '640';
          case 'medium':
            return '1366';
          case 'large':
            return '1920';
          case 'extra-large':
            return '2400';
          default:
            return '2400';
        }
      })()}` : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      download
      className={classnames(styles.btn, styles[`btn--${type}`], className)}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {text}
    </a>
  ) : (
    <button
      className={classnames(styles.btn, styles[`btn--${type}`], isLiked && styles['btn--liked'], className)}
      type={type === 'submit' || type === 'reset' ? type : 'button'}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {text}
    </button>
  );

export default Button;
