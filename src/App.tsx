import {Route, Routes, useNavigate} from 'react-router-dom';
import {DefaultLayout} from "./view/common/defaultlayout/DefaultLayout.tsx";
import {LoginPage} from "./view/pages/login/LoginPage.tsx";
import {RegisterPage} from "./view/pages/register/RegisterPage.tsx";
import {useEffect} from "react";
import {isTokenExpired} from "./auth/auth.ts";

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('role');
            navigate("/login")
        }
    }, [])

    return (
        <>
            <Routes>
                <Route path="/*" element={<DefaultLayout/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </>
    )
}

export default App
