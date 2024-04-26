import Text from "../../../component/text/Text";
import {FontStyle} from "../../../component/text/FontStyle";
import TextButton from "../../../component/button/TextButton";
import ButtonColor from "../../../component/button/ButtonColor";
import ButtonType from "../../../component/button/ButtonType";
import ButtonSize from "../../../component/button/ButtonSize";
import ChatCell from "../component/ChatCell";
import React, {useEffect, useRef, useState} from "react";
import chatPingSocket from "../../../repository/socket/Socket";
import chatPingAxios from "../../../repository/http/Http";
import {getCookie} from "../../../repository/cookie/Cookie";
import {ChatContainer, Container, Content, InfoContainer, Input, InputContainer} from "./ChatStyle";
import { ReactComponent as SendFill } from "../../../assets/send_fill.svg";
import { ReactComponent as LogoutLine } from "../../../assets/logout_line.svg";
import Color from "../../../component/color/Color";
import Button from "../../../component/button/Button";

const Chat = (
    {
        handleFlow
    }
) => {

    const chatContainerRef = useRef(null);
    const [chatList, setChatList] = useState([]);
    const [text, setText] = useState('');
    const sendMessage = () => {
        if (text === "") {
            return;
        }
        chatPingAxios.post('/match/send-message', {
            message: text
        }).then(response => {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            setText('');
        }).catch(e => {
            console.log(e.response?.data);
        });
    };

    const finishChatting = () => {
        chatPingAxios.post('/match/finish')
            .then(_ => {
                handleFlow()
            })
            .catch(e => {
                handleFlow()
                console.log(e);
            });
    };

    useEffect(() => {
        chatPingSocket.on('message', (data) => {
            setChatList(data);
            setTimeout(() => {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }, 100);
        });
        chatPingAxios.get('/match/chat')
            .then(response => {
                const data = response.data;
                setChatList(data);
                setTimeout(() => {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }, 100)
            })
    }, []);

    return (
        <>
            <InfoContainer>
                <Text fontStyle={FontStyle.TITLE}>대화중</Text>
                <div style={{flex: 1}}></div>
                <Button color={ButtonColor.GRAY} type={ButtonType.OUTLINE} size={ButtonSize.SMALL}
                            onClick={finishChatting}>
                    <LogoutLine fill={Color.GRAY500}/>
                </Button>
            </InfoContainer>
            <ChatContainer ref={chatContainerRef}>
                {chatList.map((item, index) => (
                    <ChatCell chat={item} isMe={item.sender.email === getCookie('EMAIL')}/>))}
            </ChatContainer>
            <InputContainer>
                <Input value={text} onChange={i => setText(i.target.value)} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                }}/>
                <TextButton enabled={text !== ""} onClick={sendMessage}>
                    <SendFill fill={Color.WHITE} />
                </TextButton>
            </InputContainer>
        </>
    );
}

export default Chat;