"use client";

import { IconType } from "react-icons";

interface Props {
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  className?: string;
  small?: boolean;
  icon?: IconType;
}
const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  outline,
  className,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
      ${
        outline
          ? " bg-white border-black text-black "
          : " bg-rose-500 border-rose-500 text-white "
      }
      ${
        small
          ? " py-1 text-sm font-light border"
          : "py-3 text-md font-semibold border-2 "
      } ${className}`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {children}
    </button>
  );
};

export default Button;
