import {useEffect, useRef, useState} from "react";
import chatPingSocket from "../../repository/socket/Socket";
import {
    ChatContainer, CloseButton,
    Container,
    Content,
    InfoContainer,
    Input,
    InputContainer
} from "./ChatStyle";
import ChatCell from "./component/ChatCell";
import {getToken} from "../../repository/cookie/Cookie";
import chatPingAxios from "../../repository/http/Http";
import Text from "../../component/text/Text";
import {FontStyle} from "../../component/text/FontStyle";
import Label from "../../component/label/Label";
import Button from "../../component/button/Button";
import ButtonType from "../../component/button/ButtonType";
import ButtonSize from "../../component/button/ButtonSize";
import ButtonColor from "../../component/button/ButtonColor";

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
        });
        chatPingSocket.on('message', (data) => {
            const {member1, member2, chatList} = data;
            console.log(member1, member2, chatList);
        });
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
    };

    const sendMessage = () => {
        const inputValue = input.current.value;
        if (inputValue === "") {
            return;
        }
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        chatPingSocket.emit("message", {
            message: inputValue,
            token: getToken()
        });

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
                                <Label>대구소프트웨어마이스터고등학교</Label>
                                <Text fontStyle={FontStyle.TITLE}>두근두근 당신 곁의 이성친구...</Text>
                            </div>
                        </InfoContainer>
                        <img
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20Blowing%20a%20Kiss.png"
                            alt="Face Blowing a Kiss" width="200px"/>
                        <Button onClick={startMatch}>매칭시작</Button>
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
                        <Text fontStyle={FontStyle.TITLE}>당신과 가장 어울리는 친구를 찾고 있어요...</Text>
                        <Button
                            color={ButtonColor.GRAY}
                            onClick={cancelMatching}
                            style={{
                                marginTop: '8px'
                            }}
                        >취소</Button>
                    </div>
                )}
                {flow === 'chat' && (
                    <>
                        <InfoContainer>
                            <Text fontStyle={FontStyle.TITLE}>대화중</Text>
                            <div style={{flex: 1}}></div>
                            <Button type={ButtonType.OUTLINE} size={ButtonSize.SMALL} onClick={cancelMatching}>나가기</Button>
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
                            <Button onClick={sendMessage}>보내기</Button>
                        </InputContainer>
                    </>
                )}
            </Content>
        </Container>
    );
};

export default Chat;