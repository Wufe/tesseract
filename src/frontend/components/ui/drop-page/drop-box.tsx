import styled from "styled-components";
import { FlexCol } from '../flex-col';

export const OuterDropDiv = styled(FlexCol)`
    background: #FFA047;
    width: 100%;
    max-width: 936px;
    height: 216px;
    padding: 8px;
    flex-grow: 0;
    color: #292929;
`;

export const InnerDropDiv = styled.div`
    background: rgba(22, 22, 22, .16);
    border: 1px dashed #363636;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const DropFileSelector = styled.div`
    user-select: none;
    cursor: pointer;
    background: #FFF;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    padding: 0;

    &>*:first-child {
        height: 100%;
        min-width: 4.625em;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        padding: 1em 0;
    }

    &>*:nth-child(2) {
        height: 100%;
        min-width: 8.875em;
        border-right: 1px solid #98A0A6;
        padding: 1em 0;
        display: flex;
        align-items: center;
        user-select: none;
    }

    &>*:last-child {
        min-width: 3em;
        height: 100%;
        padding: 1em 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &:hover {
        background: #F0F0F0;
    }
`;