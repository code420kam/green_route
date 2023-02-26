import React from "react";
import bigLogo from "../img/logolittle.png";
import Map from "./Map";
import "../home.css";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NoCrashOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getVehicleId } from "../Actions/fetchDB";
import { connect, MapStateToProps, useSelector } from "react-redux";
import { State } from "../redux/reducer";
import { fetchVehicleId } from "../Actions/getCarsApi";
import { incomingData, PropsFromState } from "../Actions/interfaces";
import { calculateFuelConsumption } from "../Actions/helpers";

const mapStateToProps: MapStateToProps<PropsFromState, {}, State> = (
  state
) => ({
  vehicle_id: state.vehicle_id,
});

const Home = (props: any) => {
  const store = useSelector((state) => state) as unknown as PropsFromState;
  console.log("store", store);
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = React.useState<incomingData>();
  const logoutHandle = () => {
    localStorage.clear();
    navigate("/");
  };
  React.useEffect(() => {
    fetchVehicleId(store.vehicle_id).then((res: any) => {
      return setVehicleData(res);
    });
  }, []);
  return (
    <div className="container">
      <div className="heading">
        <img src={bigLogo} alt="logo" />
      </div>
      <div className="vehDetails">
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <NoCrashOutlined />
                </ListItemIcon>
                <ListItemText primary="Vehicle Details" />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemText primary="Make" />
                <ListItemText primary={vehicleData?.make} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Model" />
                <ListItemText primary={vehicleData?.model} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Construction" />
                <ListItemText primary={`${vehicleData?.year}`} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Cylinderes" />
                <ListItemText primary={vehicleData?.cylinders + " Cylinders"} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Fuel Type" />
                <ListItemText primary={vehicleData?.fuelType1} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Fuel Consumption" />
                <ListItemText
                  primary={
                    vehicleData?.comb08 &&
                    calculateFuelConsumption(vehicleData?.comb08) +
                      " l/100 km"
                  }
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="co2 polution" />
                <ListItemText primary={vehicleData?.co2 + " grams/mile"} />
              </ListItem>
            </List>
          </nav>
        </Box>
        <Button onClick={() => navigate("myvehicles")}>
          Show all Vehicles
        </Button>
      </div>
      <div className="userProfile"> user profile</div>
      <div className="mapContainer">
        <Map />
      </div>
      <div>
        <Button variant="outlined" type="submit" onClick={() => logoutHandle()}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Home);
