import Home from "./page/home/Home";
import {GlobalStyle} from "./GlobalStyle";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/login/Login";
import Chat from "./page/chat/Chat";
import Matching from "./page/matching/Matching";
import {createContext, useEffect, useState} from "react";
import chatPingAxios from "./repository/http/Http";
import chatPingSocket from "./repository/socket/Socket";
import {getCookie, TokenType} from "./repository/cookie/Cookie";

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

export const FlowProvider = ({children}) => {
    const [flow, setFlow] = useState('IDLE');

    const handleFlow = () => {
        chatPingAxios.post('/match/flow')
            .then(response => {
                console.log(response.data);
                const flow = response.data.flow;
                setFlow(flow);
                const url = makeFlowUrl(flow);
                if (window.location.pathname === url) {
                    return;
                }
                window.location.href = url;
                window.location.replace(url);
            })
            .catch(e => {
            });
    };

    const handleSocketLogin = () => {
        const accessToken = getCookie(TokenType.ACCESS_TOKEN);
        if (!accessToken) {
            return;
        }
        chatPingSocket.emit('login', {
            accessToken
        });
    }

    useEffect(() => {
        handleFlow();
        handleSocketLogin();

        chatPingSocket.on('flow', () => {
            handleFlow();
        });
    }, []);

    return (
        <FlowContext.Provider value={{flow, handleFlow}}>
            {children}
        </FlowContext.Provider>
    );
};
export const FlowContext = createContext();

function App() {

    return (
        <FlowProvider>
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path={'*'} element={<Home/>}/>
                    <Route path={'/chat'} element={<Chat/>}/>
                    <Route path={'/matching'} element={<Matching/>}/>
                </Routes>
            </BrowserRouter>
        </FlowProvider>
    );
}

export default App;
