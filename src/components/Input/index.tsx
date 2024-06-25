import React from "react";
import * as S from "./styles";

interface InputProps {
  label?: string;
  type?: string;
  placeHolder?: string;
  value?: string;
  disabled?: boolean;
  optional?: boolean;
  rightAdd?: React.ReactNode;
  leftAdd?: React.ReactNode;
  inputFunction?: React.ChangeEventHandler<HTMLInputElement>;
  infoText?: string;
  status?: "" | "warning" | "error" | undefined;
  errorShow?: boolean;
  errorText?: string;
}
export const Input: React.FC<InputProps> = ({
  label,
  type,
  placeHolder,
  value,
  disabled,
  rightAdd,
  leftAdd,
  inputFunction,
  status,
  optional,
  errorText,
  errorShow,
}) => {
  return (
    <S.Container>
      {label && <S.Label>{!optional ? <p>{label}</p> : label}</S.Label>}
      <S.InputArea
        disabled={disabled}
        type={type}
        value={value}
        placeholder={placeHolder}
        suffix={rightAdd}
        prefix={leftAdd}
        onChange={inputFunction}
        status={status}
      />
      {errorShow && <S.Error htmlFor="">{errorText}</S.Error>}
    </S.Container>
  );
};
