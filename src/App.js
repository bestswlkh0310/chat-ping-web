import Chat from "./page/chat/Chat";
import {GlobalStyle} from "./GlobalStyle";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/login/Login";

function App() {
    return (
        <>
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path={'*'} element={<Chat />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
