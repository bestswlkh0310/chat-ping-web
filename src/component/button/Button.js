import {ButtonContainer} from "./ButtonStyle";
import Text from "../text/Text";
import ButtonType from "./ButtonType";
import ButtonSize from "./ButtonSize";
import ButtonColor from "./ButtonColor";

const Button = (
    {
        style,
        type = ButtonType.FILLED,
        color = ButtonColor.PRIMARY,
        size = ButtonSize.LARGE,
        onClick,
        children
    }
) => {
    return (
        <ButtonContainer
            style={style}
            color={ButtonType.foreground(type, color)}
            background={ButtonType.background(type, color)}
            borderColor={ButtonType.borderColor(type, color)}
            padding={ButtonSize.padding(size)}
            onClick={onClick}
        >
            <Text fontStyle={ButtonSize.fontStyle(size)}>
                {children}
            </Text>
        </ButtonContainer>
    );
};

export default Button;
