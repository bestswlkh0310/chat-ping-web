import styled from "styled-components";
import {darkenHexColor} from "../../util/Color+darkenHexColor";

export const ButtonContainer = styled.button`
    // layout
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props => props.padding};

    // style
    border-radius: 12px;
    background: ${props => props.background};
    outline: none;
    color: ${props => props.color};
    cursor: ${props => props.enabled ? 'pointer' : 'auto'};
    border: 2px solid ${props => props.borderColor};
    
    &:hover {
        background: ${props => props.enabled ? darkenHexColor(props.background, 5) : props.background};
    }
    &:active {
        scale: ${props => props.enabled ? 0.94: 1};
    }
    transition: background 0.2s, color 0.2s, scale 0.2s ease-out;
`
