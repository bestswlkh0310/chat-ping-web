import Text from "../../../component/text/Text";
import {FontStyle} from "../../../component/text/FontStyle";
import {Container, Content} from "./MatchingStyle";

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
                </div>
            </Content>
        </Container>
    )
}

export default Matching;