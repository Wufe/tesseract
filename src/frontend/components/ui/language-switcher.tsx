import React from 'react';
import styled from 'styled-components';

type TInnerProps = {
    height?: string;
    fontSize?: string;
    selected?: boolean;
}
export const LanguageSwitcherInner = styled.div<TInnerProps>`
    height: ${({height}) => height || '36px'};
    font-size: ${({fontSize}) => fontSize || '.875rem'};

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    user-select: none;

    ${({selected}) => selected ? `background: #363636;` : 'cursor: pointer;'}
`;

type TOuterProps = {
    width?: string;
}
export const LanguageSwitcherOuter = styled.div<TOuterProps>`
    width: ${({width}) => width || '240px'};
    background: #009EFF;
    padding: 2px;
    display: flex;
    border-radius: 2px;
    
    ${LanguageSwitcherInner} {
        width: 50%;
        flex-shrink: 0;
    }
    
`;