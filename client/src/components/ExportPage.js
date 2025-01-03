import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Box, CircularProgress } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ExportPage = () => {
  const [track, setTrack] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://healthtracker-6j0z.onrender.com/api/tracks')
      .then(res => {
        setTrack(res.data); // Changed from setTracks to setTrack
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tracks:', err);
        setLoading(false);
      });
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title and date
    doc.setFontSize(16);
    doc.text('Tracks List', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

    // Create table data
    const tableColumn = ["name", "steps", "caloriesBurned", "distanceCovered", "weight"];
    const tableRows = track.map(t => [
      track.name,
      track.steps,
      track.caloriesBurned,
      track.distanceCovered,
      track.weight,
      // new Date(track.date).toLocaleDateString()
    ]);

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }
    });

    doc.save('tracks-list.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(track.map(t => ({ // Changed from tracks to track
      name: track.name, // Corrected to use the correct object property
      steps: track.steps,
      caloriesburned: track.caloriesburned,
      distancecovered: track.distancecovered,
      weight: track.weight,
      // 'Published Date': new Date(t.date).toLocaleDateString(),
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(data, 'tracks-list.xlsx');
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(track.map(track => ({ // Changed from tracks to track
      name: track.name, // Corrected to use the correct object property
      steps: track.steps,
      caloriesBurned: track.caloriesBurned,
      distanceCovered: track.distanceCovered,
      weight: track.weight,
        // 'Published Date': new Date(t.date).toLocaleDateString(),
    })));

    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const data = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(data, 'tracks-list.csv');
  };

  const exportToText = () => {
    let content = 'TRACKS LIST\n\n';
    content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    
    track.forEach((track, index) => { // Changed from tracks to track
      content += `${index + 1}. TRACK DETAILS\n`;
      content += `name: ${track.name}\n`; // Changed from track.name to t.name
      content += `steps: ${track.steps}\n`;
      content += `caloriesBurned: ${track.caloriesBurned}\n`;
      content += `distanceCovered: ${track.distanceCovered}\n`;
      content += `weight: ${track.weight}\n`; // Changed from track.weight to t.weight
      content += '\n----------------------------\n\n';
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'tracks-list.txt');
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Manage Exports
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4 }} align="center" color="text.secondary">
          Choose a format to export your track collection seamlessly
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
          gap: 3,
          mt: 4 
        }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PictureAsPdfIcon />}
            onClick={exportToPDF}
            sx={{ p: 2, backgroundColor: '#d32f2f' }}
          >
            Export PDF
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<TableViewIcon />}
            onClick={exportToCSV}
            sx={{ p: 2, backgroundColor: '#1976d2' }}
          >
            Export CSV
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={exportToExcel}
            sx={{ p: 2, backgroundColor: '#388e3c' }}
          >
            Export Excel
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<DescriptionIcon />}
            onClick={exportToText}
            sx={{ p: 2, backgroundColor: '#f57c00' }}
          >
            Export Text
          </Button> 
        </Box>

        <Typography variant="body2" sx={{ mt: 4 }} align="center" color="text.secondary">
          Total Tracks Available for Export: {track.length}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ExportPage;