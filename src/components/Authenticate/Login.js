import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { LoginButton, LoginContainer, Title } from "./LoginStyledComponent";
import { UserLogin } from "../../servicesapi/Userapi";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../App";
const Login = () => {
    const navigate = useNavigate();
    const [LogData, setLogData] = useState({
        username: "",
        password: "",
        rememberme: true,
    });
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const LogSubmit = (e) => {
        e.preventDefault();
        if (LogData.password === "" || LogData.username === "") {
            updateMessages([
                {
                    title: "Error !!",
                    message: "Please enter login credential ",
                },
                ...messages,
            ]);
        }
        else {
            UserLogin(LogData).then((res) => {
                if (res.status === 200) {
                    res.json().then((r) => localStorage.setItem("jwtTokenId", r));
                    localStorage.setItem("EmailId", LogData.username);
                    navigate("/dashboard");
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Username or Password is incorrect",
                        },
                        ...messages,
                    ]);
                }
            });
        }
        // document.getElementsByClassName("modal-backdrop").style.display = "none";
        // const { email, password } = LogData;
        // if (email === "" && password === "") {
        //   toast.error("Please enter Email and Password");
        // }
    };
    const Loghandler = (e) => {
        setLogData({ ...LogData, [e.target.name]: e.target.value });
    };
    return (_jsxs(LoginContainer, { children: [_jsx("div", { children: _jsx("img", { src: "https://www.mtsgrp.net/img/logo/logoorgv2.png", className: "mb-3", style: { width: "500px" } }) }), _jsxs("form", { className: "shadow", style: { width: "500px", border: "1px solid #000", padding: "2rem" }, children: [_jsx(Title, { children: "Sign in to your account" }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "username", children: "User Name" }), _jsx("input", { type: "text", onChange: Loghandler, value: LogData.username, className: "form-control", id: "username", name: "username", "aria-describedby": "emailHelp", placeholder: "Enter User Name" })] }), _jsxs("div", { className: "form-group mt-3", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", value: LogData.password, onChange: Loghandler, className: "form-control", id: "password", placeholder: "Password", name: "password" })] }), _jsx("div", { className: "form-group mt-4", children: _jsx(LoginButton, { className: "w-100", onClick: (e) => { LogSubmit(e); }, children: "Sign In" }) }), _jsx("div", { className: "form-group mt-4", children: _jsx(LoginButton, { className: "w-100", onClick: (e) => { navigate("/createuser"); }, children: "Create Account" }) })] })] }));
};
export default Login;
