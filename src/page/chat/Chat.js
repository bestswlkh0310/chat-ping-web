import {useEffect, useRef, useState} from "react";
import chatPingSocket from "../../repository/socket/Socket";
import {
    ButtonText,
    ChatContainer, CloseButton,
    Container,
    Content, ExitButton,
    InfoContainer,
    Input,
    InputContainer, MatchButton,
    SubmitButton, SubTitle, Title
} from "./ChatStyle";
import ChatCell from "./component/ChatCell";

const Chat = () => {

    const [flow, setFlow] = useState('home');
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
                {flow === 'home' && (
                    <>
                        <InfoContainer>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <SubTitle>대구소프트웨어마이스터고등학교</SubTitle>
                                <Title>두근두근 당신 곁의 이성친구...</Title>
                            </div>
                        </InfoContainer>
                        <img
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20Blowing%20a%20Kiss.png"
                            alt="Face Blowing a Kiss" width="200px"/>
                        <MatchButton onClick={() => { setFlow('matching') }}>매칭시작</MatchButton>
                    </>
                )}
                {flow === 'chat' && (
                    <>
                        <InfoContainer>
                            <Title>대화중</Title>
                            <div style={{flex: 1}}></div>
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
                    </>
                )}
                {flow === 'matching' && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Sparkling%20Heart.png" alt="Sparkling Heart" width="160px"/>
                        <Title>당신과 가장 어울리는 친구를 찾고 있어요...</Title>
                        <CloseButton
                            onClick={() => {
                                setFlow('home');
                            }}
                            style={{
                                marginTop: '8px'
                            }}
                        >취소</CloseButton>
                    </div>
                )}
            </Content>
        </Container>
    );
};

export default Chat;