import styled from "styled-components";

type TProps = {
    secondary?: boolean;
    width?: string;
    height?: string;
}
export const Button = styled.div<TProps>`
    & > * {
        height: ${({height}) => height || '2.8em'};
        cursor: pointer;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .9rem;
        font-weight: 400;
        text-decoration: none;
        border-radius: 3px;
        text-align: center;
        ${({width}) => width ? `width: ${width};` : ''}

        background: ${({secondary}) => {
            if (secondary)
                return `#0065FF`;
            return `#009EFF`;
        }};

        &:hover {
            opacity: .8;
        }
    }
`;