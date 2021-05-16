import React from 'react';
import styled from "styled-components";

type TOuterProps = {
    height?: string;
    noWrap?: boolean;
    fontSize?: string;
}
export const TextBoxOuter = styled.div<TOuterProps>`
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

type TInnerProps = {
    noWrap?: boolean;
}
export const TextBoxInner = styled.div<TInnerProps>`
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ noWrap }) => noWrap ? `white-space: nowrap;` : ''}
`;

type TProps = TOuterProps & TInnerProps;
export const TextBox = ({
    children,
    fontSize,
    height,
    noWrap
}: React.PropsWithChildren<TProps>) => {
    return <TextBoxOuter
        fontSize={fontSize}
        height={height}
        noWrap={noWrap}
        title={typeof children === 'string' ? children : null}>
            <TextBoxInner noWrap={noWrap}>{children}</TextBoxInner>
        </TextBoxOuter>;
}