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
import {getToken} from "../../repository/cookie/Cookie";
import chatPingAxios from "../../repository/http/Http";

const Chat = () => {
    const [count, setCount] = useState('..');
    const [flow, setFlow] = useState('home');
    const [chatList, setChatList] = useState([]);
    const input = useRef(null);
    const chatContainerRef = useRef(null);
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        const token = getToken();
        chatPingSocket.emit('online', token);
        setInterval(() => {
            chatPingSocket.emit('online', token);
        }, 3_000);

        chatPingSocket.on('online', (count) => {
            setCount(count);
        });
        chatPingSocket.on('matched', (data) => {
            const members = data.split(' ');
            const token = getToken();
            if (members[0] === token || members[1] === token) {
                setFlow('chat');
            }
        });
        chatPingSocket.on('cancel', (data) => {
            const members = data.split(' ');
            const token = getToken();
            if (members[0] === token || members[1] === token) {
                alert('매칭이 종료되었습니다');
                setFlow('home');
            }
        })
    }, []);

    const startMatch = () => {
        setFlow('matching');
        chatPingAxios.post(`/match/${getToken()}`)
            .then(res => {
                const data = res.data;
                console.log(data);
            })
            .catch(e => console.log(e));
    };

    const cancelMatching = () => {
        chatPingSocket.emit('cancel', getToken());
    }

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
                                <div
                                    style={{
                                        display: 'flex',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >온라인 {count}명 <span style={{
                                    width: '12px',
                                    height: '12px',
                                    background: '#17ff00',
                                    borderRadius: '50%',
                                    marginBottom: '3px',
                                    border: '2px solid #eee',
                                }}></span> </div>
                                <SubTitle>대구소프트웨어마이스터고등학교</SubTitle>
                                <Title>두근두근 당신 곁의 이성친구...</Title>
                            </div>
                        </InfoContainer>
                        <img
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20Blowing%20a%20Kiss.png"
                            alt="Face Blowing a Kiss" width="200px"/>
                        <MatchButton onClick={startMatch}>매칭시작</MatchButton>
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
                            onClick={cancelMatching}
                            style={{
                                marginTop: '8px'
                            }}
                        >취소</CloseButton>
                    </div>
                )}
                {flow === 'chat' && (
                    <>
                        <InfoContainer>
                            <Title>대화중</Title>
                            <div style={{flex: 1}}></div>
                            <ExitButton onClick={cancelMatching}>나가기</ExitButton>
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

            </Content>
        </Container>
    );
};

export default Chat;