import Home from "./page/home/Home";
import {GlobalStyle} from "./GlobalStyle";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/login/Login";
import Chat from "./page/home/chat/Chat";
import Matching from "./page/home/matching/Matching";
import {createContext, useEffect, useState} from "react";
import chatPingAxios from "./repository/http/Http";
import chatPingSocket from "./repository/socket/Socket";
import {getCookie, TokenType} from "./repository/cookie/Cookie";
import Main from "./page/main/Main";
import Start from "./page/home/start/Start";

const makeFlowUrl = (flow) => {
    switch (flow) {
        case 'IDLE':
            return '/home';
        case 'MATCHED':
            return '/chat';
        case 'MATCHING':
            return '/matching'
    }
}

function App() {

    return (
        <>
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path={'*'} element={<Main/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
