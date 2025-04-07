import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";
function Button({ children, onClick, type = "button", variant = "primary", size = "normal", disabled = false, className ="", ...props  }) {
  return (
    <>
      <button
        type = {type}
        className={`${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ""} ${className} ${styles[size]}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
        >
          {children}
        </button>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "light", "cancel", "submit", "outline", "danger"]),
  size: PropTypes.oneOf(["large", "normal", "small"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

export default Button;