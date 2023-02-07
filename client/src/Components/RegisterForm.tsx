import { Visibility } from "@mui/icons-material";
import {
  Button,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React from "react";
import { fetchNewUser } from "../Actions/fetchDB";
import CarSelector from "./CarSelector";

const RegisterForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [activateCarSelect, setActivateCarSelect] = React.useState(false);
  const [activateRegisterform, setActivateRegisterform] = React.useState(true);
  const clickHandler = async () => {
    if (username.length || password.length > 5) {
      setActivateRegisterform(false);
      setActivateCarSelect(true);
      const user_data = { username: username, password: password };
      localStorage.setItem("user_data_complete", "true");
      await fetchNewUser(user_data).then((res) => {
        if (res !== undefined) {
          localStorage.setItem("user_id", res.count);
        } else return "Error";
      });
    } else {
      window.alert("Please collect username & password");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {activateRegisterform && (
        <FormControl>
          <h3>Please choose a username & password</h3>
          <FormControl sx={{ minWidth: 120 }}>
            <TextField
              label="Username"
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
              required
            ></TextField>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <TextField
              label="Password"
              variant="standard"
              required
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Visibility></Visibility>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => clickHandler()}
          >
            Submit
          </Button>
        </FormControl>
      )}
      <div style={{ top: "50%", position: "fixed", right: "50%" }}>
        {activateCarSelect && <CarSelector />}
      </div>
    </div>
  );
};

export default RegisterForm;