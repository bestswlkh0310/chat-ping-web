import {Container, Content, ContentText} from "./ChatCellStyle";

const ChatCell = ({chat}) => {

    return (
        <Container>
            <Content>
                <ContentText>{chat.content}</ContentText>
            </Content>
        </Container>
    );
};

export default ChatCell;