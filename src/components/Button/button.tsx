import React from "react";
import classnames from "classnames";


type ButtonSize = 'lg' | 'sm'
type ButtonType = "primary" | "default" | "danger" | "link";
// 按钮的props
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

// 并集
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;

// Partial：typescript全局函数，将属性全部变成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps>= (props) => {
  const {
    disabled,
    size,
    btnType,
    children,
    href,
    className,
    ...resetProps
  } = props;
  const classes = classnames("echo-btn", className, {
    [`echo-btn-${btnType}`]: btnType,
    [`echo-btn-${size}`]: size,
    "echo-disabled": btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a href={href} className={classes} {...resetProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...resetProps}>
        {children}
      </button>
    );
  }
};


Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
