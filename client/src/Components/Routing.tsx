import {
  DepartureBoard,
  Navigation,
  SwapCalls,
  Timer,
} from "@mui/icons-material";
import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Routing = (travelTime: any) => {
  const [timeInMinutes, setTimeInMinutes] = React.useState("");
  const navigate = useNavigate()
  const [bool, setBool] = React.useState(false);
  const arrivalString = travelTime.travelTime;
  // const arrival = new Date(arrivalString)
  React.useEffect(() => {}, [travelTime]);
  console.log("TRAVELTIME ", arrivalString);
  return (
    <div>
      {travelTime.travelTime !== undefined ? (
        <List
          sx={{ width: "100%", maxWidth: "360", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Route Details:
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <SwapCalls />
            </ListItemIcon>
            <ListItemText
              primary={`Expected journey time: ${Math.round(
                travelTime.travelTime.travelTimeInSeconds / 60
              )} minutes`}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Timer />
            </ListItemIcon>
            <ListItemText
              primary={`Your distance is ${Math.round(
                travelTime.travelTime.lengthInMeters / 1000
              )} km`}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DepartureBoard />
            </ListItemIcon>
            <ListItemText
              primary={`Expected arrival at ${new Date(
                travelTime.travelTime.arrivalTime
              )}`}
            />
          </ListItemButton>
          <Button startIcon={<Navigation />} onClick={() => navigate("/navigation")}>Start Navigation</Button>
        </List>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Routing;
