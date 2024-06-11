import { MenuProps } from "antd";
import * as S from "./styles";
import React from "react";
import { ArrowsDownUp, CaretDown } from "@phosphor-icons/react";

interface OrdenationProps {
  items: MenuProps["items"];
  placement?:
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight"
    | "top"
    | "bottom"
    | undefined;
}

export const OrdenationButton: React.FC<OrdenationProps> = ({
  items,
  placement,
}) => {
  return (
    <S.ordenationButton
      menu={{ items }}
      trigger={["click"]}
      placement={placement}
    >
      <div>
        <span>
          <ArrowsDownUp size={22} weight="bold" />
          Ordenar por
        </span>
        <CaretDown size={22} weight="bold" />
      </div>
    </S.ordenationButton>
  );
};
