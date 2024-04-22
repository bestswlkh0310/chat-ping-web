import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    padding: 8px;
    align-items: center;
    justify-content: ${props => props.align};
    gap: 10px;
    align-self: stretch;
`

export const Content = styled.div`
    display: flex;
    padding: 14px 20px;
    align-items: center;
    gap: 10px;
    
    border-radius: ${props => props.borderRadius};
    background: ${props => props.background};
    border: 1.5px solid ${props => props.foregroundColor};
    color: ${props => props.foregroundColor};
`

export const ContentText = styled.div`
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    user-select: none;
`