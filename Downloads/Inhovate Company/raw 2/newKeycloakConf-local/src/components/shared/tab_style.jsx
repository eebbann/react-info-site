import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Button = styled.button`
  padding: 15px;
  border: none;
  margin: 0 2px;
  background-color: #f1f1f1;
  color: #2a2929;
  font-size: 0.9rem;
  font-weight: bold;
  box-shadow: 0px 0px 9px 0px #807f7fbf;

  ${({ active }) =>
    active &&
    css`
      background: #64abd6;
      color: white;
      border: none;
      padding: 15px 15px;
      font-size: 1rem;
      font-weight: bold;
    `}
`;

export const TabStyled = styled.div`
  padding: 15px 0 0 0;
  background: none;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const Div = styled.div`
  text-align: center;
  font-size: 0.7rem !important;
  text-transform: capitalize;
  color: #353232 !important;
`;
