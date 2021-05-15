import styled from "styled-components";
import { Button } from "./button";

type TProps = {
    height?: string;
    noWrap?: boolean;
    fontSize?: string;
}
export const TextBox = styled.div<TProps>`
    width: 100%;
    height: ${({height}) => height || '3rem'};
    max-width: 552px;
    font-weight: 400;
    display: flex;
    align-items: center;
    padding: 6px 32px;
    background: #292929;
    border: 1px solid #363636;
    position: relative;
    text-overflow: ellipsis;
    overflow: hidden;

    ${({noWrap}) => noWrap ? `white-space: nowrap;` : ''}
    font-size: ${({fontSize}) => fontSize || '.95rem'};
`;