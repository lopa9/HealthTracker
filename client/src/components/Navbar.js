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
import PhoneIcon from '@mui/icons-material/Phone';

  
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
            href="https://drive.google.com/file/d/1VYHOCpWJExo9ow7va7rhByJv8_UxTaGs/view?usp=sharing"
            onClick={handleNotesClick}
            startIcon={<MenuBookIcon />} // Added icon here
          >
            Resume
          </Button>

           <Button
           color="primary"
           href="tel:090909090"
           startIcon={<PhoneIcon />}>
           Contact Us
           </Button>


         
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