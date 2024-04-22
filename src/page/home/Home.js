import {createContext, useContext, useEffect, useRef, useState} from "react";
import chatPingSocket from "../../repository/socket/Socket";
import {
    ChatContainer,
    Container,
    Content,
    InfoContainer,
    Input,
    InputContainer
} from "./HomeStyle";
import ChatCell from "./component/ChatCell";
import Text from "../../component/text/Text";
import {FontStyle} from "../../component/text/FontStyle";
import Label from "../../component/label/Label";
import Button from "../../component/button/Button";
import ButtonType from "../../component/button/ButtonType";
import ButtonSize from "../../component/button/ButtonSize";
import ButtonColor from "../../component/button/ButtonColor";
import {getCookie, TokenType} from "../../repository/cookie/Cookie";
import {useNavigate} from "react-router-dom";
import chatPingAxios from "../../repository/http/Http";
import {FlowContext} from "../../App";

const Home = () => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    const {handleFlow} = useContext(FlowContext);
    useEffect(() => {
        if (!getCookie(TokenType.ACCESS_TOKEN)) {
            navigate('/login');
        }
        // chatPingSocket.emit('online', id);
        setInterval(() => {
            // chatPingSocket.emit('online', id);
        }, 3_000);

        chatPingSocket.on('online', (count) => {
            // setCount(count);
        });
        chatPingSocket.on('matched', (data) => {
            // const {member1, member2} = data;
            // if (member1 === id || member2 === id) {
            //     setFlow('home');
            // }
        });
        chatPingSocket.on('cancel', (data) => {
            const {member1, member2} = data;
            // if (member1 === id || member2 === id) {
            //     setFlow('login');
            //     console.log('매칭종료')
            //     alert('매칭이 종료되었습니다');
            // }
        });
        chatPingSocket.on('message', (data) => {
            const {member1, member2, chatList} = data;
            console.log(member1, member2, chatList);
            // if (id === member2 || id === member1) {
            //     setChatList(chatList);
            //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            // }
        });
    }, []);

    const startMatch = () => {
        chatPingAxios.post('/match')
            .then(res => {
                handleFlow();
            })
            .catch(e => {
                handleFlow();
            });
    };

    return (
        <Container>
            <Content>
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
                        }}></span></div>
                        <Label>대구소프트웨어마이스터고등학교</Label>
                        <Text fontWeight={700} fontStyle={FontStyle.TITLE}>두근두근 당신 곁의 이성친구...</Text>
                    </div>
                </InfoContainer>
                <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20Blowing%20a%20Kiss.png"
                    alt="Face Blowing a Kiss" width="200px"/>
                <Button onClick={startMatch}>매칭시작</Button>
            </Content>
        </Container>
    );
};

export default Home;