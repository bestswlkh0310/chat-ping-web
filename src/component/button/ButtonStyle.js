import styled from "styled-components";

export const ButtonContainer = styled.button`
    // layout
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 14px;

    // style
    border-radius: 12px;
    background: ${props => props.background};
    outline: none;
    color: ${props => props.color};
    cursor: pointer;
    border: 2px solid ${props => props.borderColor};
    
    &:active {
        scale: 0.94;
    }
    transition: background 0.2s, color 0.2s, scale 0.2s ease-out;
`
