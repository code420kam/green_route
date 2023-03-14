import { Person } from "@mui/icons-material";
import { Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { username } from "../Actions/fetchDB";

const UserProfile = () => {
  const userid = localStorage.getItem("user_id")

React.useEffect(() =>{
  
    if(userid !== null){
      const dd = username(userid)
    }
  },[])

  return (
    <div>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="User Profile" />
            </ListItem>
            <Divider />
          </List>
        </nav>
      </Box>
      <h1>Profile</h1>
    </div>
  );
};

export default UserProfile;
