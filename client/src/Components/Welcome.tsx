import { AppRegistration, Login } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import backgroundImage from "../img/welcomepagebackground01.png"

const Welcome = () => {
  const [registerField, setRegisterField] = useState(false);
  const navigator = useNavigate();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to Green Route!</h1>
      <h2>Register for free to get access to all features</h2>
      <h2>You can also start as a guest</h2>
      <span>
        <h2>Click here to register for free</h2>
      </span>
      <Button
        startIcon={<AppRegistration />}
        color="primary"
        onClick={() => navigator("/register")}
      >
        Create your Account now
      </Button>
      <div>
        <Button
          startIcon={<Login />}
          color="primary"
          onClick={() => navigator("/login")}
        >
          Login
        </Button>
        <div style={{maxHeight:"100vh", maxWidth:"100vh", justifyContent:"center"}}>
          <img src={backgroundImage} style={{width: "100%", height:"100%", marginLeft: "50%"}} alt="backgroundimageswithcars"/>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
