import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook'; 

// const notesPages = [
//     { title: 'Home', path: '/notes/home' },
//     { title: 'Schedule', path: '/notes/schedule' },
//   ];
  
  const Navbar = () => {
    const [notesAnchorEl, setNotesAnchorEl] = useState(null);
  
  const handleNotesClick = (event) => {
    setNotesAnchorEl(event.currentTarget);
  };

  const handleNotesClose = () => {
    setNotesAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ width: '100%' }}>
      <Toolbar>
        <Typography  variant="h5" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
        Health Tracker Project
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            color="primary"
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          <Button
            color="primary"
            href="https://docs.google.com/document/d/1uzownFahQYMaJygXzNCl8WGa1_ekxpYR2_KUUMhdx-M/edit?tab=t.0"
            onClick={handleNotesClick}
            startIcon={<MenuBookIcon />} // Added icon here
          >
            Resume
          </Button>
          {/* <Menu
            anchorEl={notesAnchorEl}
            open={Boolean(notesAnchorEl)}
            onClose={handleNotesClose}
          >
            {notesPages.map((page) => (
              <MenuItem 
                key={page.path} 
                component={RouterLink} 
                to={page.path}
                onClick={handleNotesClose}
              >
                {page.title}
              </MenuItem>
            ))}
          </Menu> */}
          <IconButton
            color="primary"
            component="a"
            href="https://github.com/lopa9/HealthTracker"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;