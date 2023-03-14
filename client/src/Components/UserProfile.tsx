import { AllInclusive, Person } from "@mui/icons-material";
import { Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { getUsername, getVehicleId } from "../Actions/fetchDB";

const UserProfile = () => {
  const userid = localStorage.getItem("user_id")
  const [username, setUsername] = React.useState()
  let totalkm = 15;
 const getData = async () => {
  if(userid !== null)
  {
    setUsername(await getUsername(userid));
    getVehicleId(userid).then((res) => {
      res.map((datei:any) => {
        const drivenkm = datei.driven_km
        console.log(drivenkm)
        totalkm += drivenkm
      })})
  }
 }
React.useEffect(() =>{
  
   getData()
  })

  return (
    <div>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={`${username}`} />
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemIcon>
                <AllInclusive />
              </ListItemIcon>
              <ListItemText primary="Total Distance" secondary={`${totalkm} km`} />
            </ListItem>
          </List>
        </nav>
      </Box>
    </div>
  );
};

export default UserProfile;
