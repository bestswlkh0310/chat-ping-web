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
