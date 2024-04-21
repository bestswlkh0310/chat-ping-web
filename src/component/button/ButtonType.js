import Color from "../color/Color";
import ButtonColor from "./ButtonColor";

class ButtonType {
    static FILLED = 'FILLED';
    static OUTLINE = 'OUTLINE';

    static foreground = (type, color) => {
        if (type === ButtonType.FILLED && color === ButtonColor.PRIMARY) {
            return Color.WHITE;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.PRIMARY) {
            return Color.PRIMARY;
        } else if (type === ButtonType.FILLED && color === ButtonColor.GRAY) {
            return Color.GRAY600;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.GRAY) {
            return Color.GRAY600
        }
    };

    static background = (type, color) => {
        if (type === ButtonType.FILLED && color === ButtonColor.PRIMARY) {
            return Color.PRIMARY;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.PRIMARY) {
            return Color.WHITE;
        } else if (type === ButtonType.FILLED && color === ButtonColor.GRAY) {
            return Color.GRAY100;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.GRAY) {
            return Color.WHITE;
        }
    };

    static borderColor = (type, color) => {
        if (type === ButtonType.FILLED && color === ButtonColor.PRIMARY) {
            return Color.TRANSPARENT;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.PRIMARY) {
            return Color.PRIMARY;
        } else if (type === ButtonType.FILLED && color === ButtonColor.GRAY) {
            return Color.TRANSPARENT;
        } else if (type === ButtonType.OUTLINE && color === ButtonColor.GRAY) {
            return Color.GRAY300;
        }
    };
}

export default ButtonType