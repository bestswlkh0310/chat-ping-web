import {ButtonContainer} from "./ButtonStyle";
import Text from "../text/Text";
import ButtonType from "./ButtonType";
import ButtonSize from "./ButtonSize";
import ButtonColor from "./ButtonColor";
import Button from "./Button";

const TextButton = (
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
        <Button
            enabled={enabled}
            style={style}
            type={type}
            color={color}
            size={size}
            onClick={onClick}
        >
            <Text fontStyle={ButtonSize.fontStyle(size)}>
                {children}
            </Text>
        </Button>
    );
};

export default TextButton;
