import Color from "../color/Color";
import ButtonColor from "./ButtonColor";

class ButtonType {
    static FILLED = 'FILLED';
    static OUTLINE = 'OUTLINE';

    static foreground = (type, color, enabled) => {
        if (type === ButtonType.FILLED && color === ButtonColor.PRIMARY) {
            return enabled ? Color.WHITE : Color.WHITE;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.PRIMARY) {
            return enabled ? Color.PRIMARY600 : Color.PRIMARY400;
        } else if (type === ButtonType.FILLED && color === ButtonColor.GRAY) {
            return enabled ? Color.GRAY600 : Color.GRAY400;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.GRAY) {
            return enabled ? Color.GRAY500 : Color.GRAY300;
        }
    };

    static background = (type, color, enabled) => {
        if (type === ButtonType.FILLED && color === ButtonColor.PRIMARY) {
            return enabled ? Color.PRIMARY600 : Color.PRIMARY400;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.PRIMARY) {
            return enabled ? Color.WHITE : Color.WHITE;
        } else if (type === ButtonType.FILLED && color === ButtonColor.GRAY) {
            return enabled ? Color.GRAY100 : Color.GRAY100;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.GRAY) {
            return enabled ? Color.WHITE : Color.WHITE;
        }
    };

    static borderColor = (type, color, enabled) => {
        if (type === ButtonType.FILLED && color === ButtonColor.PRIMARY) {
            return Color.TRANSPARENT;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.PRIMARY) {
            return enabled ? Color.PRIMARY600 : Color.PRIMARY400;
        } else if (type === ButtonType.FILLED && color === ButtonColor.GRAY) {
            return Color.TRANSPARENT;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.GRAY) {
            return enabled ? Color.GRAY300 : Color.GRAY100;
        }
    };
}

export default ButtonType