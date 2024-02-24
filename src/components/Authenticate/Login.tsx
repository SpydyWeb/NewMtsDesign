import React, { useContext, useState } from "react";
import { LoginButton, LoginContainer, Title } from "./LoginStyledComponent";
import { UserLogin } from "../../servicesapi/Userapi";
import { useNavigate } from "react-router-dom";
import { ApplicationContext, ApplicationContextType } from "../../App";
const Login = () => {
  const navigate = useNavigate();
  const [LogData, setLogData] = useState({
    username: "",
    password: "",
    rememberme: true,
  });
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;

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
      } else {
        UserLogin(LogData).then((res) => {
          if (res.status === 200) {
            res.json().then((r) => localStorage.setItem("jwtTokenId", r));
            localStorage.setItem("EmailId", LogData.username);
            navigate("/dashboard");
          } else {
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

  return (
    <LoginContainer>
      <div>
        <img
          src="https://www.mtsgrp.net/img/logo/logoorgv2.png"
          className="mb-3"
          style={{ width: "500px" }}
        />
      </div>

      <form
        className="shadow"
        style={{ width: "500px", border: "1px solid #000", padding: "2rem" }}
      >
        <Title>Sign in to your account</Title>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            onChange={Loghandler}
            value={LogData.username}
            className="form-control"
            id="username"
            name="username"
            aria-describedby="emailHelp"
            placeholder="Enter User Name"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={LogData.password}
            onChange={Loghandler}
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
          />
        </div>

        <div className="form-group mt-4">
          <LoginButton className="w-100" onClick={(e)=>{LogSubmit(e)}}>Sign In</LoginButton>
        </div>
        <div className="form-group mt-4">
          <LoginButton className="w-100" onClick={(e)=>{ navigate("/createuser");}}>Create Account</LoginButton>
        </div>
      </form>
    </LoginContainer>
  );
};

export default Login;
