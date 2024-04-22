import {Container, Content, ContentText} from "./ChatCellStyle";
import Color from "../../../component/color/Color";

const ChatCell = ({chat, isMe}) => {

    return (
        <Container align={isMe ? "end" : "start"}>
            <Content
                borderRadius={isMe ? '16px 0 16px 16px' : '0 16px 16px 16px'}
                background={isMe ? Color.WHITE : Color.PRIMARY}
                foregroundColor={isMe ? Color.PRIMARY : Color.WHITE}
            >
                <ContentText>{chat.message}</ContentText>
            </Content>
        </Container>
    );
};

export default ChatCell;