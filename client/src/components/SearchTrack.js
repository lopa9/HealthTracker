import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TrackCard from './TrackCard'; // Updated import
import axios from 'axios';

const URL = process.env.REACT_APP_API_URL; // Access environment variable


const SearchTrack = () => {
  const [track, setTrack] = useState([]);
  const [filteredTrack, setFilteredTrack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: '',
    searchField: 'name', // Matches CreateTrack
    sortBy: 'name', // Matches CreateTrack
    sortOrder: 'asc',
  });

  useEffect(() => {
    axios
      .get(`${URL}/api/tracks`) // Replace with the actual API endpoint
      .then((res) => {
        setTrack(res.data);
        setFilteredTrack(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching tracks:', err);
        setLoading(false);
      });
  }, []);

  const applyFilters = () => {
    let result = [...track];
 // Search filter
 if (filters.searchTerm) {
  result = result.filter((track) => {
    const searchValue = track[filters.searchField]?.toString().toLowerCase();
    return searchValue?.includes(filters.searchTerm.toLowerCase());
  });
}

    // Sorting
    result.sort((a, b) => {
      let valueA = a[filters.sortBy]?.toString().toLowerCase();
      let valueB = b[filters.sortBy]?.toString().toLowerCase();

      if (valueA < valueB) return filters.sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredTrack(result);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      searchField: 'name',
      sortBy: 'name',
      sortOrder: 'asc',
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, mt: 5, bgcolor: '#000000', borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Search Track
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
        Find a track record from the database
      </Typography>

      {/* Search and Filter Section */}
      <Card sx={{ p: 3, mt: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            {/* Search Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Search"
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            {/* Search By Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Search By</InputLabel>
                <Select
                  value={filters.searchField}
                  label="Search By"
                  onChange={(e) => setFilters({ ...filters, searchField: e.target.value })}
                >
                  <MenuItem value="Track_name">Track Name</MenuItem>
                  <MenuItem value="steps">steps</MenuItem>
                  <MenuItem value="caloriesBurned">caloriesBurned</MenuItem>
                  <MenuItem value="distanceCovered">distanceCovered</MenuItem>
                  <MenuItem value="weight">weight</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Sort By Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={filters.sortBy}
                  label="Sort By"
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                >
                  <MenuItem value="name">Track Name</MenuItem>
                  <MenuItem value="steps">steps</MenuItem>
                  <MenuItem value="caloriesBurned">caloriesBurned</MenuItem>
                  <MenuItem value="distanceCovered">distanceCovered</MenuItem>
                  <MenuItem value="weight">weight</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Sort Order */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Order</InputLabel>
                <Select
                  value={filters.sortOrder}
                  label="Order"
                  onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Reset Filters Button */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Typography variant="body2" color="textSecondary" sx={{ mt: 3 }}>
        Found {filteredTrack.length} tracks
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {filteredTrack.map((track) => (
          <Grid item xs={12} sm={6} md={4} key={track._id}>
            <TrackCard track={track} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchTrack;