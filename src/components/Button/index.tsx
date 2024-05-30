import React from "react";
import * as S from "./styles";

interface ButtonProps {
  label?: string | React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean | { delay?: number };
  shape?: "circle" | "default" | "round";
  buttonFunction?: () => void;
  size?: "large" | "middle" | "small";
}

export const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  icon,
  loading,
  shape,
  size,
  buttonFunction,
}) => {
  return (
    <S.ButtonArea
      disabled={disabled}
      icon={icon}
      loading={loading}
      shape={shape}
      onClick={buttonFunction}
      size={size}
    >
      {label}
    </S.ButtonArea>
  );
};
