
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import echoverseTheme from './theme/echoverseTheme';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CreateTrack from './components/CreateTrack';
 import TrackList from './components/TrackList';
import TrackDetails from './components/TrackDetails';
import ExportPage from './components/ExportPage'
import QRCodePage from './components/QRCodePage'; 
 import UpdateTrack from './components/UpdateTrack';
 import SearchTrack from './components/SearchTrack';
 //import NotesPage from './components/NotesPage'; // Import NotesPage component

const App = () => {
  return (
    <ThemeProvider theme={echoverseTheme}>
    <CssBaseline />

     <Router>
       <Box display="flex" flexDirection="column" minHeight="100vh">
       <Navbar />
        <Box component="main" flexGrow={1} py={3}>
        <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/create-track' element={<CreateTrack />} />
        <Route path='/track-list' element={<TrackList />} />
        <Route path='/show-track/:id' element={<TrackDetails />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/qr-codes" element={<QRCodePage />} />
        <Route path='/edit-track/:id' element={<UpdateTrack />} />
        <Route path="/search" element={<SearchTrack />} />
        </Routes>
      </Box>
      < Footer/>
      </Box>
     </Router>
     </ThemeProvider>
  );
};

export default App;