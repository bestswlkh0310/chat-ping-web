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
                return FontStyle.BODY;
        }
    }

    static padding = (type) => {
        switch (type) {
            case ButtonSize.LARGE:
                return '12px'
        }
    }
}

export default ButtonSize;