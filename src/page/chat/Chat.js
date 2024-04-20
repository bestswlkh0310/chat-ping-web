import {useEffect, useRef, useState} from "react";
import chatPingSocket from "../../repository/socket/Socket";
import {
    ButtonText,
    ChatContainer,
    Container,
    Content, ExitButton,
    InfoContainer,
    Input,
    InputContainer,
    SubmitButton, Title
} from "./ChatStyle";
import ChatCell from "./component/ChatCell";

const Chat = () => {

    const [chatList, setChatList] = useState([]);
    const input = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        chatPingSocket.on("message", (data) => {
            setChatList(data);
        });
    }, []);

    const sendMessage = () => {
        const inputValue = input.current.value;
        if (inputValue === "") {
            return;
        }
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        chatPingSocket.emit("message", inputValue);

        input.current.value = "";
    };

    return (
        <Container>
            <Content>
                <InfoContainer>
                    <Title>대화중</Title>
                    <ExitButton>나가기</ExitButton>
                </InfoContainer>
                <ChatContainer ref={chatContainerRef}>
                    {chatList.map((item, index) => (<ChatCell chat={item}/>))}
                </ChatContainer>
                <InputContainer>
                    <Input ref={input} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}/>
                    <SubmitButton onClick={sendMessage}>
                        <ButtonText>보내기</ButtonText>
                    </SubmitButton>
                </InputContainer>
            </Content>
        </Container>
    );
};

export default Chat;