import React from 'react';
import styled from "styled-components";

type TProps = {
    percentage: number;
}
export const ProgressBarOuter = styled.div<TProps>`
    height: .5rem;
    border-radius: 2px;
    width: 100%;
    & > div {
        background: #FFA047;
        width: 100%;
        height: 100%;
        transition: max-width .3s ease-out;
        max-width: ${props => props.percentage}%;
    }
`;

export const ProgressBar = ({ percentage }: React.PropsWithChildren<TProps>) => {
    return <ProgressBarOuter percentage={percentage}>
        <div></div>
    </ProgressBarOuter>
}