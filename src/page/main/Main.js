import {useEffect} from "react";
import {getCookie, TokenType} from "../../repository/cookie/Cookie";
import {useNavigate} from "react-router-dom";
import Home from "../home/Home";
import {Container, Content} from "./MainStyle";

const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = !getCookie(TokenType.ACCESS_TOKEN)
        if (accessToken) {
            navigate('/login');
        }
    }, []);

    return (
        <Container>
            <Content>
                <Home/>
            </Content>
        </Container>
    )
};

export default Main;