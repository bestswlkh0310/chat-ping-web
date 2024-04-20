import styled from "styled-components";

export const Container = styled.div`
    // layout
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    
    // style
    background: linear-gradient(181deg, #F50A7A 0.61%, #FF450A 99.47%);
`

export const Content = styled.div`
    // layout
    display: flex;
    width: 36%;
    height: 512px;
    padding: 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    
    // style
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.16);
`

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 0 0;
    align-self: stretch;
    overflow-y: scroll;
`

export const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`

export const Input = styled.input`
    flex: 1 0 0;
    align-self: stretch;

    border-radius: 12px;
    border: 1px solid #DDD;
    outline: none;
    padding: 0 16px;

    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

export const SubmitButton = styled.button`
    display: flex;
    height: 52px;
    padding: 12px 20px;
    justify-content: center;
    align-items: center;
    gap: 12px;

    border-radius: 12px;
    background: #FF4D00;
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        background: #e24600;
    }
    &:active {
        scale: 0.96;
    }
    transition: background, scale 0.2s ease-in-out;
`

export const ButtonText = styled.div`
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`