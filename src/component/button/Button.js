import {ButtonContainer} from "./ButtonStyle";
import Text from "../text/Text";
import ButtonType from "./ButtonType";
import ButtonSize from "./ButtonSize";
import ButtonColor from "./ButtonColor";

const Button = (
    {
        enabled = true,
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
            color={ButtonType.foreground(type, color, enabled)}
            background={ButtonType.background(type, color, enabled)}
            borderColor={ButtonType.borderColor(type, color, enabled)}
            padding={ButtonSize.padding(size)}
            onClick={onClick}
            disabled={!enabled}
            enabled={enabled}
        >
            {children}
        </ButtonContainer>
    );
};

export default Button;
