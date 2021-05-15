import styled from "styled-components";

export const ButtonsContainer = styled.div`
    display: flex;
    width: 360px;
    max-width: 100%;
    
    & > * {
        flex-grow: 1;
        margin: 0 .75rem;
    }
`;