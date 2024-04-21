import {FontStyle} from "../text/FontStyle";

class ButtonSize {
    static LARGE
    static MEDIUM
    static SMALL

    static fontStyle = (type) => {
        switch (type) {
            case ButtonSize.LARGE:
                return FontStyle.SUBTITLE;
            case ButtonSize.MEDIUM:
                return FontStyle.BODY;
            case ButtonSize.SMALL:
                return FontStyle.LABEL;
            default:
                return FontStyle.BODY;
        }
    }

    static padding = (type) => {
        switch (type) {
            case ButtonSize.LARGE:
                return '10px 14px'
            case ButtonSize.MEDIUM:
                return '8px 12px'
            case ButtonSize.SMALL:
                return '6px 10px'
            default:
                return '0';
        }
    }
}

export default ButtonSize;