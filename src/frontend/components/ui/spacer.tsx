import styled from "styled-components";

type TVerticalSpacerProps = {
    space: number;
}
export const VerticalSpacer = styled.div<TVerticalSpacerProps>`
    margin-bottom: ${props => props.space}rem;
`;