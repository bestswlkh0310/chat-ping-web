import {ChatContainer, Container, Content, InfoContainer, Input, InputContainer} from "../home/HomeStyle";
import Text from "../../component/text/Text";
import {FontStyle} from "../../component/text/FontStyle";
import Button from "../../component/button/Button";
import ButtonColor from "../../component/button/ButtonColor";
import ButtonType from "../../component/button/ButtonType";
import ButtonSize from "../../component/button/ButtonSize";
import ChatCell from "../home/component/ChatCell";
import {useContext, useRef, useState} from "react";
import chatPingSocket from "../../repository/socket/Socket";
import chatPingAxios from "../../repository/http/Http";
import {FlowContext} from "../../App";

const Chat = () => {

    const chatContainerRef = useRef(null);
    const [chatList, setChatList] = useState([]);
    const input = useRef(null);
    const {handleFlow} = useContext(FlowContext);

    const sendMessage = () => {
        const inputValue = input.current.value;
        if (inputValue === "") {
            return;
        }
        chatPingSocket.emit("message", {
            message: inputValue
        });
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        input.current.value = "";
    };

    const finishChatting = () => {
        chatPingAxios.post('/match/finish')
            .then(response => {
                handleFlow();
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <Container>
            <Content>
                <InfoContainer>
                    <Text fontStyle={FontStyle.TITLE}>대화중</Text>
                    <div style={{flex: 1}}></div>
                    <Button color={ButtonColor.GRAY} type={ButtonType.OUTLINE} size={ButtonSize.SMALL}
                            onClick={finishChatting}>나가기</Button>
                </InfoContainer>
                <ChatContainer ref={chatContainerRef}>
                    {chatList.map((item, index) => (<ChatCell chat={item} isMe={true}/>))}
                </ChatContainer>
                <InputContainer>
                    <Input ref={input} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}/>
                    <Button style={{
                        minWidth: '100px'
                    }} onClick={sendMessage}>보내기</Button>
                </InputContainer>
            </Content>
        </Container>
    );
}

export default Chat;