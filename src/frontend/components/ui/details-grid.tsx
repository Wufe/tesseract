import styled from "styled-components";

export const DetailsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 340px;
    grid-template-rows: auto;
    align-items: center;
    grid-gap: 13px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const DetailLabel = styled.span`
    text-align: right;

    @media (max-width: 480px) {
        text-align: left;
    }
`;