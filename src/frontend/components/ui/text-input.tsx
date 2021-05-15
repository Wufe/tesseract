import styled from "styled-components";
import { TextBox } from "./text-box";

type TProps = {
    height?: string;
    disabled?: boolean;
}
export const TextInput = styled.input`
    width: 100%;
    height: ${({ height }) => height || '3rem'};
    max-width: ${({ width }) => width ? `${width}` : '552px'};
    font-size: .95rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    padding: 1em;
    background: #292929;
    border: 1px solid #363636;
    position: relative;
    outline: none;
    border-radius: 3px;

    ${({disabled}) => disabled ? `
        pointer-events: none;
        background: #666;
    ` : ''}
`;