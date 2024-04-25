import Label from "../../../component/label/Label";
import Text from "../../../component/text/Text";
import {FontStyle} from "../../../component/text/FontStyle";
import Button from "../../../component/button/Button";
import {Container, Content, InfoContainer} from "./StartStyle";
import chatPingAxios from "../../../repository/http/Http";

const Start = () => {

    const startMatch = () => {
        chatPingAxios.post('/match')
            .then(res => {
                // handleFlow();
            })
            .catch(e => {
                // handleFlow();
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
    )
};

export default Start;