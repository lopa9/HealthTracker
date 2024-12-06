
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import fitPulse from './theme/fitPulse';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
// import CreateTrack from './components/CreateTrack';
// import TrackList from './components/TrackList';
// import TrackDetails from './components/TrackDetails';
// import UpdateTrack from './components/UpdateTrack';

// import NotesPage from './components/NotesPage'; // Import NotesPage component

const App = () => {
  return (
    <ThemeProvider theme={fitPulse}>
    <CssBaseline />

     <Router>
       <Box display="flex" flexDirection="column" minHeight="100vh">
       <Navbar />
        <Box component="main" flexGrow={1} py={3}>
        <Routes>
        <Route exact path='/' element={<HomePage />} />
        </Routes>
      </Box>
      < Footer/>
      </Box>
     </Router>
     </ThemeProvider>
  );
};

export default App;