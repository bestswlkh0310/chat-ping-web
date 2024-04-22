import {Container, Content} from "../home/HomeStyle";
import Text from "../../component/text/Text";
import {FontStyle} from "../../component/text/FontStyle";
import Button from "../../component/button/Button";
import ButtonColor from "../../component/button/ButtonColor";

const Matching = () => {

    return (
        <Container>
            <Content>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px'
                    }}
                >
                    <img
                        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Sparkling%20Heart.png"
                        alt="Sparkling Heart" width="160px"/>
                    <Text fontStyle={FontStyle.TITLE}>당신과 가장 어울리는 친구를 찾고 있어요...</Text>
                    {/*<Button*/}
                    {/*    color={ButtonColor.GRAY}*/}
                    {/*    onClick={cancelMatching}*/}
                    {/*    style={{*/}
                    {/*        marginTop: '8px'*/}
                    {/*    }}*/}
                    {/*>취소</Button>*/}
                </div>
            </Content>
        </Container>
    )
}

export default Matching;