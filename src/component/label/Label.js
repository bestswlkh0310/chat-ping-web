import {LabelContainer} from "./LabelStyle";
import {FontStyle} from "../text/FontStyle";
import Text from "../text/Text";

const Label = ({children}) => {
    return (
        <LabelContainer>
            <Text fontStyle={FontStyle.BODY}>
                {children}
            </Text>
        </LabelContainer>
    );
}

export default Label;