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
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/tracks')
          .then(res => {
            settracks(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.error('Error in fetching tracks at ExportPage:', err);
            setLoading(false);
          });
      }, []);

      const exportToPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('track List', 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

        const tableColumn = ["name", "steps", "caloriesBurned", "distanceCovered" , "weight"];
        const tableRows = tracks.map(track => [
          track.name,
          track.steps,
          track.caloriesBurned,
          track.distanceCovered,
          track.weight
         // new Date(patient.admite_Date).toLocaleDateString()
        ]);

        doc.autoTable({
            startY: 30,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255 }
          });

          doc.save('track-list.pdf');
        };

        const exportToExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(tracks.map(track => ({
              name: track.name,
              steps: track.steps,
              caloriesBurned: track.caloriesBurned,
              distanceCovered: track.distanceCovered,
              weight: track.weight

             // 'Admit Date': new Date(patient.admite_Date).toLocaleDateString()
            })));

            const worktrack = XLSX.utils.track_new();
            XLSX.utils.track_append_sheet(worktrack, worksheet, "tracks");
            const excelBuffer = XLSX.write(worktrack, { trackType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(data, 'track-list.xlsx');
          };

          const exportToCSV = () => {
            const worksheet = XLSX.utils.json_to_sheet(tracks.map(track => ({
                name: track.name,
                steps: track.steps,
                caloriesBurned: track.caloriesBurned,
                distanceCovered: track.distanceCovered,
                weight: track.weight
               // 'Admit Date': new Date(patient.admite_Date).toLocaleDateString()
            })));
            
            const csv = XLSX.utils.sheet_to_csv(worksheet);
            const data = new Blob([csv], { type: 'text/csv;charset=utf-8' });
            saveAs(data, 'tracks-list.csv');
          };

          const exportToText = () => {
            let content = 'track List\n\n';
            //content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
            
            tracks.forEach((track, index) => {
              content += `${index + 1}. TRACK DETAILS\n`;
              content += `name: ${track.name}\n`;
              content += `steps: ${track.steps}\n`;
              content += `caloriesBurned: ${track.caloriesBurned}\n`;
              content += `distanceCovered: ${track.distanceCovered}\n`;
              content += `weight: ${track.weight}\n`;
            
            });
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            saveAs(blob, 'track-list.txt');
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
                  Export Tracks
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 4 }} align="center" color="text.secondary">
                  Export your track collection in different formats
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
                    sx={{ p: 2 }}
                  >
                    Export as PDF
                  </Button>
                  { <Button
                    variant="contained"
                    size="large"
                    startIcon={<TableViewIcon />}
                    onClick={exportToCSV}
                    sx={{ p: 2 }}
                  >
                    Export as CSV
                  </Button> }
                  { <Button
                    variant="contained"
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={exportToExcel}
                    sx={{ p: 2 }}
                  >
                    Export as Excel
                  </Button> }
                  { <Button
                    variant="contained"
                    size="large"
                    startIcon={<DescriptionIcon />}
                    onClick={exportToText}
                    sx={{ p: 2 }}
                  >
                    Export as Text
                  </Button> }
                </Box>
                <Typography variant="body2" sx={{ mt: 4 }} align="center" color="text.secondary">
                  Total Tracks: {tracks.length}
                </Typography>
              </Paper>
            </Container>
          );
        };

export default ExportPage;