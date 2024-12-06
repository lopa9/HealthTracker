
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import CustomTheme from './theme/CustomTheme';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import CreateTrack from './components/CreateTrack';
// import TrackList from './components/TrackList';
// import TrackDetails from './components/TrackDetails';
// import UpdateTrack from './components/UpdateTrack';
// import HomePage from './components/HomePage';
// import NotesPage from './components/NotesPage'; // Import NotesPage component

const App = () => {
  return (
    <ThemeProvider theme={CustomTheme}>
    <CssBaseline />

     <Router>
       <Box display="flex" flexDirection="column" minHeight="100vh">
       <Navbar />
        <Box component="main" flexGrow={1} py={3}>
      </Box>
      < Footer/>
      </Box>
     </Router>
     </ThemeProvider>
  );
};

export default App;