

export class FontStyle {
    static TITLE = 'TITLE'
    static SUBTITLE = 'SUBTITLE'
    static BODY = 'BODY'
    static LABEL = 'LABEL'

    static fontSize = (fontStyle) => {
        switch (fontStyle) {
            case FontStyle.TITLE:
                return 24;
            case FontStyle.SUBTITLE:
                return 20;
            case FontStyle.BODY:
                return 18;
            case FontStyle.LABEL:
                return 16;
            default:
                return 0;
        }
    }

    static fontWeight = (fontStyle) => {
        switch (fontStyle) {
            case FontStyle.TITLE:
                return 500;
            case FontStyle.SUBTITLE:
                return 500;
            case FontStyle.BODY:
                return 500;
            case FontStyle.LABEL:
                return 500;
            default:
                return 0;
        }
    }
}