import styled from "styled-components";

type TButtonProps = {
    secondary?: boolean;
}

export const Button = styled.div<TButtonProps>`
    a {
        padding: .9em 0;
        color: white;
        display: block;
        font-size: .9rem;
        font-weight: 400;
        text-decoration: none;
        border-radius: 3px;
        text-align: center;

        background: ${props => {
            if (props.secondary)
                return `#0065FF`;
            return `#009EFF`;
        }}
    }
`;