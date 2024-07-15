import { Email, GraphicEq, Person, Photo, Preview, VideoLibrary } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

export default function EditingSidebar() {

    const history = useHistory();

  const drawer = (
    <Box>
      <Toolbar/>
      <Typography variant="h6" noWrap sx={{ padding: 2, color:"#FFFFFF" }}>
        Build & Edit
      </Typography>
      <List>
        <ListItem button>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Admin Overview (WIP)" />
        </ListItem>
        <ListItem button onClick={()=>{history.push('/imageUpload')}}>
          <ListItemIcon>
            <Photo />
          </ListItemIcon>
          <ListItemText primary="Photos" />
        </ListItem>
        <ListItem button onClick={()=>{history.push('/videoUpload')}}>
          <ListItemIcon>
            <VideoLibrary />
          </ListItemIcon>
          <ListItemText primary="Videos" />
        </ListItem>
        <ListItem button onClick={()=>{history.push('/voiceUpload')}}>
          <ListItemIcon>
            <GraphicEq />
          </ListItemIcon>
          <ListItemText primary="Voice Notes" />
        </ListItem>
        <ListItem button onClick={()=>{history.push('/letterUpload')}}>
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary="Letters" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Preview />
          </ListItemIcon>
          <ListItemText primary="Preview (WIP)" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          zIndex: 1,
          overflow: 'hidden',
          backgroundColor: '#e85230',
        },
      }}
      open={open}
    >
      {drawer}
    </Drawer>
  );
}
