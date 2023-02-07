import { Button } from "@mui/material";
import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Welcome = () => {
  const [registerField, setRegisterField] = useState(false);
  const navigator = useNavigate()

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to Green Route!</h1>
      <h2>Register for free to get access to all features</h2>
      <h2>You can also start as a guest</h2>
      <span>
        <h2>Click here to register for free</h2>
      </span>
        <Button  variant="contained"
          color="primary" onClick={() => navigator("/register")}>Register</Button>
    </div>
  );
};

export default Welcome;
