import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from './Notification';

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)

const TrackDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [track, setTrack] = useState(null);
  const [showNotification, setShowNotification] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        console.log('Fetching track data...');
        const response = await axios.get(`${API_URL}/${id}`);
        console.log('Track data:', response.data);
        setTrack(response.data);
      } catch (error) {
        console.error('Error fetching track:', error.response || error.message);
        setShowNotification({ type: 'error', text: 'Error loading track details.' });
      }
    };
    fetchTrack();
  }, [id]);

  const deleteTrack = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setShowNotification({ type: 'success', text: 'Patient deleted successfully!' });
      setTimeout(() => navigate('/'), 1000); // Navigate after showing notification for 3 seconds
    } catch (error) {
      console.error('Error deleting track:', error);
      setShowNotification({ type: 'error', text: 'Error deleting track' });
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(null);
  };

  if (!track && !showNotification) {
    return <div className="box-container">Loading...</div>;
  }

  if (!track && showNotification) {
    return <div className="box-container">Error loading patient details.</div>;
  }

  return (
    <div className="box-container"><h2>Name: {track.name}</h2>
      <div className="track-info"><p>Date: {track.date}</p>
      <div className="track-info"><p>Steps: {track.steps}</p></div>
      <div className="track-info"><p>Weight: {weight.steps}</p></div>
      <div className="track-info"><p>Distancecovered: {track.distancecovered}</p></div>
      <div className="track-info"><p>Caloriesburned: {track.caloriesburned}</p></div> </div>
      <div className="patient-actions">
        <Link to={`/edit/${track.id}`} className="btn btn-update">Edit</Link>

        <button onClick={deleteTrack} className="btn btn-delete">Delete</button>

        <Link to="/list" className="btn btn-back">Back to Home</Link>
      </div>
      {showNotification && <Notification message={showNotification} onClose={handleCloseNotification} />}
    </div>
  );
};

export default TracktDetails;