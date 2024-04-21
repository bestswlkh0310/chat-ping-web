import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Config from "../../config/config";

const GoogleLoginButton = ({onSuccess, onFailure}) => {
    return (
        <>
            <GoogleOAuthProvider clientId={Config.googleClientId}>
                <GoogleLogin
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleLoginButton
