import React from 'react';
import styled, {css} from "styled-components";

const ButtonWrap = styled.div`
  border-radius: 4px;
  width: 100%;
  height: 68px;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  align-items: center;
  text-align: left;
  color: #000000;
  padding-top: 22.5px;
  padding-left: .82353rem;
  background: #FFFFFF;
  margin-top: .82353rem;
  margin-bottom: 4px;
  border: .11765rem solid #d6d6d6;

  ${(props) => props.selected && css`
    border-color: #0070c9;
  `}
`
export default function (props) {
    return <ButtonWrap selected={props.value === props.selected}
                       onClick={() => props.onChange(props.value)}>{props.children}</ButtonWrap>
}