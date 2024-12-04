import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)

const TrackEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({ name: '', date: '' ,steps:'',caloriesburned:'' ,distancecovered:''});

  useEffect(() => {
    const fetchTrack= async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setTrack(response.data);
      } catch (error) {
        console.error('Error fetching track:', error);
      }
    };
    fetchTrack();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrack({ ...track, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, track);
      navigate(`/detail/${id}`); // Redirect to track details page after update
    } catch (error) {
      console.error('Error updating track:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/detail/${id}`); // Navigate back to the track details page
  };

  const handleHome = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div className="box-container">
      <h1>Update Track</h1>
      <form onSubmit={handleUpdate} className="form-container">
        <input type="text" name="name" placeholder="Name" value={track.name} onChange={handleChange}
          required className="input-field"/>

        <input type="number" name="date" placeholder="Date" value={track.date} onChange={handleChange}
          required className="input-field"/>

        <input type="number" placeholder="steps" value={track.steps} onChange={handleChange} required className="input-field" />
        
        <input type="number" placeholder="caloriesburned" value={track.caloriesburned} onChange={handleChange} required className="input-field" />

        <input type="number" placeholder="distancecovered" value={track.distancecovered} onChange={handleChange} required className="input-field" />

        <input type="number" placeholder="weight" value={track.weight} onChange={handleChange} required className="input-field" />


        <div className="track-actions">
          <button type="submit" className="btn btn-update">Update</button>
          <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
          <button type="button" className="btn btn-back" onClick={handleHome}>Back to Home</button>
        </div>
      </form>
    </div>
  );
};

export default TrackEdit;