import {Container, Content} from "./LoginStyle";
import GoogleLoginButton from "../../component/oauth/GoogleLoginButton";
import chatPingAxios from "../../repository/http/Http";
import Text from "../../component/text/Text";
import {FontStyle} from "../../component/text/FontStyle";
import Label from "../../component/label/Label";
import {setToken, TokenType} from "../../repository/cookie/Cookie";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const login = (res) => {
        const {credential} = res;
        chatPingAxios.post('/auth/login', {
            idToken: credential
        }).then(response => {
            const res = response.data;
            const {accessToken, refreshToken} = res;
            setToken(accessToken, TokenType.ACCESS_TOKEN);
            setToken(refreshToken, TokenType.REFRESH_TOKEN);
            navigate('/');
        }).catch(e => {
            console.log(e);
        });
    }

    const handleFailure = (res) => {

    }

    return (
        <Container>
            <Content>
                <Text fontSize={32} fontStyle={FontStyle.TITLE}>Hello! Ping</Text>
                <Text fontStyle={FontStyle.BODY}>안녕!</Text>
                <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Hushed%20Face.png"
                    alt="Hushed Face" width="160"/>
                <Label>로그인 하고 채팅을 해봐!</Label>
                <GoogleLoginButton onSuccess={login} onFailure={handleFailure}/>
            </Content>
        </Container>
    );
}

export default Login;