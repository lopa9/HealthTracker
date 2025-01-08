import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Avatar,
  Paper,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import DownloadIcon from '@mui/icons-material/Download';
import QrCodeIcon from '@mui/icons-material/QrCode';
import NotesIcon from '@mui/icons-material/Notes';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import axios from 'axios';

const URL = process.env.REACT_APP_API_URL; // Access environment variable


const HomePage = () => {
  const [stats, setStats] = useState({
    totalTracks: 0,
    uniqueAuthors: 0,
    recentTrack: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    axios
      .get(`${URL}/api/tracks`)
      .then((res) => {
        const track = res.data;
        const uniqueAuthors = new Set(track.map((track) => track.author)).size;
        const recentTrack = track.sort((a, b) =>
          new Date(b.published_date) - new Date(a.published_date)
        )[0];

        setStats({
          totalTracks: track.length,
          uniqueAuthors,
          recentTrack,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Text Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to the Health Tracking System
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Your Health, Our Priority 🥑
          </Typography>
        </Grid>

       {/* Interactive Feature Section */}
<Grid item xs={12} md={6}>
  <Paper
    elevation={4}
    sx={{
      p: 4,
      textAlign: 'center',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: 420,
      margin: '0 auto',
      backgroundColor: 'background.paper', // Using theme color
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    }}
  >
    <Typography
      variant="h5"
      color="text.primary"
      sx={{
        fontWeight: 500,
        mb: 2,
        textTransform: 'capitalize',
      }}
    >
      Start a New Health Journey
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{
        mb: 4,
        lineHeight: 1.6,
      }}
    >
      Track your progress and achieve your fitness goals by creating a personalized health plan today.
    </Typography>
    <Button
      component={Link}
      to="/create-track"
      variant="contained"
      size="large"
      sx={{
        px: 4,
        py: 1.5,
        borderRadius: '24px',
        backgroundColor: 'highlightMed', // Updated color
        color: 'text.primary',
        '&:hover': {
          backgroundColor: 'highlightHigh', // Hover color for better contrast
        },
      }}
    >
      Create Now
    </Button>
  </Paper>
</Grid>

      </Grid>

      {/* Stats Section */}
<Grid container spacing={4} sx={{ my: 6, justifyContent: 'center' }}>
  {[
    {
      icon: <InsertChartOutlinedIcon fontSize="large" sx={{ color: '#78e0b2' }} />, // Aqua green
      title: stats.totalTracks,
      subtitle: 'Total Tracks',
      bgColor: 'primary.main',
    },
    {
      icon: <PeopleAltOutlined fontSize="large" sx={{ color: '#ffac33' }} />, // Soft orange
      title: stats.uniqueAuthors,
      subtitle: 'Unique Tracks',
      bgColor: 'highlightMed',
    },
    {
      icon: <PlaylistAddCheckOutlinedIcon fontSize="large" sx={{ color: '#f287ae' }} />, // Light rose
      title: stats.recentTrack?.title || 'No recent tracks',
      subtitle: 'Latest Track',
      bgColor: 'highlightHigh',
    },
  ].map(({ icon, title, subtitle, bgColor }, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card
        sx={{
          textAlign: 'center',
          p: 4,
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${bgColor}, ${bgColor}90)`,
          color: 'text.primary',
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.25)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.35)',
          },
        }}
      >
        <Avatar
          sx={{
            bgcolor: bgColor,
            mb: 2,
            width: 64,
            height: 64,
            fontSize: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      </Card>
    </Grid>
  ))}
</Grid>
      {/* Features Section */}
      <Typography
        variant="h5"
        color="primary"
        gutterBottom
        sx={{ textAlign: 'center', mb: 4 }}
      >
        Explore Features
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/track-list"
            variant="contained"
            size="large"
            startIcon={<LibraryBooksIcon />}
            fullWidth
            sx={{ py: 2 }}
          >
            View Tracks
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/export"
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            fullWidth
            sx={{ py: 2 }}
          >
            Export Data
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/qr-codes"
            variant="contained"
            size="large"
            startIcon={<QrCodeIcon />}
            fullWidth
            sx={{ py: 2 }}
          >
            QR Codes
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component={Link}
            to="/notes/home"
            variant="contained"
            size="large"
            startIcon={<NotesIcon />}
            fullWidth
            sx={{ py: 2 }}
          >
            Notes
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            component="a"
            href="https://github.com/lopa9/HealthTracker"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            startIcon={<GitHubIcon />}
            fullWidth
            sx={{ py: 2 }}
          >
            GitHub
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
  <Button
    component="a"
    href="/search"
    target="_self"
    rel="noopener noreferrer"
    variant="contained"
    size="large"
    startIcon={<SearchIcon />}
    fullWidth
    sx={{ py: 2 }}
  >
    Search Track
  </Button>
</Grid>

          </Grid>
    </Container>
  );
};

export default HomePage;