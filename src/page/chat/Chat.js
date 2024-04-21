import {useEffect, useRef, useState} from "react";
import chatPingSocket from "../../repository/socket/Socket";
import {
    ChatContainer,
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

const id = getToken();

const Chat = () => {
    const [count, setCount] = useState('..');
    const [flow, setFlow] = useState('home');
    const [chatList, setChatList] = useState([]);
    const input = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        chatPingSocket.emit('online', id);
        setInterval(() => {
            chatPingSocket.emit('online', id);
        }, 3_000);

        chatPingSocket.on('online', (count) => {
            setCount(count);
        });
        chatPingSocket.on('matched', (data) => {
            const {member1, member2} = data;
            if (member1 === id || member2 === id) {
                setFlow('chat');
            }
        });
        chatPingSocket.on('cancel', (data) => {
            const {member1, member2} = data;
            if (member1 === id || member2 === id) {
                setFlow('home');
                console.log('매칭종료')
                alert('매칭이 종료되었습니다');
            }
        });
        chatPingSocket.on('message', (data) => {
            const {member1, member2, chatList} = data;
            console.log(member1, member2, chatList);
            if (id === member2 || id === member1) {
                setChatList(chatList);
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        });
    }, []);

    const startMatch = () => {
        setFlow('matching');
        setChatList([]);
        chatPingAxios.post(`/match/${id}`)
            .then(res => {
                const data = res.data;
                console.log(data);
            })
            .catch(e => console.log(e));
    };

    const cancelMatching = () => {
        chatPingSocket.emit('cancel', id);
    };

    const sendMessage = () => {
        const inputValue = input.current.value;
        if (inputValue === "") {
            return;
        }
        chatPingSocket.emit("message", {
            message: inputValue,
            id
        });
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
                            <Button color={ButtonColor.GRAY} type={ButtonType.OUTLINE} size={ButtonSize.SMALL} onClick={cancelMatching}>나가기</Button>
                        </InfoContainer>
                        <ChatContainer ref={chatContainerRef}>
                            {chatList.map((item, index) => (<ChatCell chat={item} isMe={item.senderId===id}/>))}
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
                    </>
                )}
            </Content>
        </Container>
    );
};

export default Chat;