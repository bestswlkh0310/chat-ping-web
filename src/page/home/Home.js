import {useEffect, useState} from "react";
import Start from "./start/Start";
import chatPingAxios from "../../repository/http/Http";
import {getCookie, TokenType} from "../../repository/cookie/Cookie";
import chatPingSocket from "../../repository/socket/Socket";
import Matching from "./matching/Matching";
import Chat from "./chat/Chat";

const Home = () => {
    const [flow, setFlow] = useState('IDLE');

    const handleFlow = () => {
        chatPingAxios.post('/match/flow')
            .then(response => {
                console.log(response.data);
                const flow = response.data.flow;
                setFlow(flow);
                console.log(flow);
            })
            .catch(e => {
                console.log(e);
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
        <>
            {flow === 'IDLE' && <Start/>}
            {flow === 'MATCHING' && <Matching/>}
            {flow === 'MATCHED' && <Chat/>}
        </>
    );
};

export default Home;