import { DepartureBoard, SwapCalls, Timer } from "@mui/icons-material";
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import React from "react"

const Routing = (travelTime:any) => {
  const [timeInMinutes, setTimeInMinutes] = React.useState("")
  const [bool, setBool] = React.useState(false)
  const arrivalString = travelTime.travelTime
  // const arrival = new Date(arrivalString)
  React.useEffect(() => {
    
    

  },[travelTime])
  console.log("TRAVELTIME ", arrivalString) 
  return (
  <div>
     {
      travelTime.travelTime !== undefined ?  (<List sx={{width: "100%", maxWidth: "360", bgcolor: "background.paper"}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
       <ListSubheader component="div" id="nested-list-subheader">
         Route Details:
       </ListSubheader>
      }>
       <ListItemButton>
         <ListItemIcon>
         <SwapCalls />
         </ListItemIcon>
         <ListItemText primary={`Expected journey time: ${Math.round(travelTime.travelTime.travelTimeInSeconds / 60)} minutes`} />
       </ListItemButton>
       <ListItemButton>
        <ListItemIcon>
        <Timer />
        </ListItemIcon>
        <ListItemText primary={`Your distance is ${Math.round(travelTime.travelTime.lengthInMeters / 1000)} km`} />
       </ListItemButton>
       <ListItemButton>
        <ListItemIcon>
          <DepartureBoard />
        </ListItemIcon>
        <ListItemText primary={`Expected arrival at ${new Date(travelTime.travelTime.arrivalTime)}`} />
       </ListItemButton>
      </List>)
     : <p>Loading...</p>
    }
      </div>)
};

export default Routing;
