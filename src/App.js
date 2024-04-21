import Chat from "./page/chat/Chat";
import {GlobalStyle} from "./GlobalStyle";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./page/home/Home";

function App() {
    return (
        <>
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
