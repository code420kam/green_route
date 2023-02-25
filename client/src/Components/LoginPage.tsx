import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Login, Visibility } from "@mui/icons-material";
import React from "react";
import img_routing from "../img/image_routing.png";
import { getUserPassword, getVehicleId } from "../Actions/fetchDB";
import { useNavigate } from "react-router-dom";
import { updateVehicle_id } from "../redux/actions";
// import jwt from "jsonwebtoken"

const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const loginHandler = async () => {
    if (!username || !password) {
      return alert("Please check your password or username");
    }
    const passwordCheck = await getUserPassword(username, password);
    // const payload = jwt.decode(passwordCheck.token)
    // console.log(payload)
    if (passwordCheck.token === null) {
      return alert("Wrong username or password");
    }
    if (passwordCheck.message === 1) {
      const data = await getVehicleId(passwordCheck.user_id);
      updateVehicle_id(data[0].vehicle_id);
      localStorage.setItem("user_id", passwordCheck.user_id);
      navigate("/home");
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Login</h1>
      <FormControl>
        <FormControl sx={{ mindWidth: 120 }}>
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
          style={{ marginTop: "15%" }}
          variant="contained"
          startIcon={<Login />}
          color="primary"
          onClick={() => loginHandler()}
        >
          Login
        </Button>
      </FormControl>
      <div
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          justifyContent: "center",
        }}
      >
        <img
          src={img_routing}
          style={{ width: "90%", height: "90%", marginTop: "10%" }}
          alt="background routing with car"
        />
      </div>
    </div>
  );
};

export default LoginPage;
