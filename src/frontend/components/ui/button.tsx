import styled from "styled-components";
import { TextBox, TextBoxInner, TextBoxOuter } from "./text-box";

type TProps = {
    secondary?: boolean;
    tertiary?: boolean;
    width?: string;
    height?: string;
    disabled?: boolean;
}
export const Button = styled.div<TProps>`
    & > * {
        height: ${({height}) => height || '2.8em'};
        cursor: pointer;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        font-weight: 400;
        text-decoration: none;
        border-radius: 3px;
        text-align: center;
        ${({width}) => width ? `width: ${width};` : ''}

        background: ${({secondary, tertiary}) => {
            if (secondary)
                return `#0065FF`;
            if (tertiary)
                return `#FFA047`;
            return `#009EFF`;
        }};

        ${({ disabled }) => disabled ? `
            pointer-events: none;
            background: #AAA;
        ` : ''}

        &:hover {
            opacity: .8;
        }

        ${TextBoxOuter} > ${TextBoxInner} > & {
            position: absolute;
            top: 5px;
            right: 6px;
            bottom: 5px;
        }
    }
`;