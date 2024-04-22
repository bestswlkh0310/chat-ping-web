import {TextContainer} from "./TextStyle";
import {FontStyle} from "./FontStyle";

const Text = (
    {
        fontStyle=FontStyle.BODY,
        fontSize,
        fontWeight,
        children
    }
) => {
    return (
        <TextContainer
            fontSize={`${fontSize ?? FontStyle.fontSize(fontStyle)}px`}
            fontWeight={`${fontWeight ?? FontStyle.fontWeight(fontStyle)}`}
        >{children}</TextContainer>
    );
};

export default Text;