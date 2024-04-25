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
    @media screen and (max-width: 1000px) {
        width: 55%;
    }
    @media screen and (max-width: 800px) {
        width: 60%;
    }
    @media screen and (max-width: 600px) {
        width: 80%;
    }
    @media screen and (max-width: 500px){
        width: 90%;
    }
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
    width: 100%;
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

