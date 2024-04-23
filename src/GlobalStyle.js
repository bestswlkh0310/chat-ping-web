import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-family: 'Roboto Light',sans-serif;
    }
    :root {
        --primary: radial-gradient(circle at 50% 50%, rgba(255, 3, 133, 1) 0%, rgba(250, 188, 14, 1) 100%);
    }
`