import {Container} from "./HomeStyle";
import GoogleLoginButton from "../../component/oauth/GoogleLoginButton";
import chatPingAxios from "../../repository/http/Http";

const Home = () => {

    const login = (res) => {
        const {credential} = res;
        chatPingAxios.post('/auth/login', {
            idToken: credential
        }).then(response => {
            const res = response.data;
            console.log(res);
        }).catch(e => {
            console.log(e);
        });
    }

    const handleFailure = (res) => {

    }

    return (
        <Container>
            <GoogleLoginButton onSuccess={login} onFailure={handleFailure}/>
        </Container>
    );
}

export default Home;