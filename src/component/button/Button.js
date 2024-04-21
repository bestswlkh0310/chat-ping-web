import {ButtonContainer} from "./ButtonStyle";
import {FontStyle} from "../text/FontStyle";
import Text from "../text/Text";
import ButtonType from "./ButtonType";
import ButtonSize from "./ButtonSize";
import ButtonColor from "./ButtonColor";

const Button = (
    {
        type = ButtonType.FILLED,
        color = ButtonColor.PRIMARY,
        size = ButtonSize.LARGE,
        onClick,
        children
    }
) => {
    return (
        <ButtonContainer
            color={ButtonType.foreground(type, color)}
            background={ButtonType.background(type, color)}
            borderColor={ButtonType.borderColor(type, color)}
            onClick={onClick}
        >
            <Text fontStyle={ButtonSize.fontStyle(size)}>
                {children}
            </Text>
        </ButtonContainer>
    );
};

export default Button;
