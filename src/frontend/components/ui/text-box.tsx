import styled from "styled-components";

type TProps = {
    height?: string;
}
export const TextBox = styled.div<TProps>`
    width: 100%;
    height: ${({height}) => height || '3rem'};
    max-width: 552px;
    font-size: .95rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    padding: 6px;
    padding-right: 128px; // button: 116px + padding ( 6px * 2 )
    background: #292929;
    border: 1px solid #363636;
    padding-left: 32px;
    position: relative;

    & > .btn {
        position: absolute;
        top: 5px;
        right: 6px;
        bottom: 5px;
    }
`;