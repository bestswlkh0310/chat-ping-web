import {TextContainer} from "./TextStyle";
import {FontStyle} from "./FontStyle";

const Text = ({fontStyle, children}) => {
    return (
        <TextContainer
            fontSize={`${FontStyle.fontSize(fontStyle)}px`}
            fontWeight={`${FontStyle.fontWeight(fontStyle)}`}
        >{children}</TextContainer>
    );
};

export default Text;