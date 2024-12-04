import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const API_URL = process.env.REACT_APP_API_URL

const TrackAdd = ({ onPatientAdd = () => { } }) => {
    const [name,setName] = useState('')
    const [date,setDate] = useState('')
    const [steps,setSteps] = useState('')
    const [caloriesBurned,setCaloriesBurned] = useState('')
    const [distancecovered,setDistanceCovered] = useState('')
    const navigate = useNavigate()
    const [showNotification,setShowNotification] = useState(null)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !date || !steps  || !caloriesBurned || !distanceCovered) return

        try {
            const response = await axios.post(API_URL, { name, age, gender, co_number });
            const newPatientId = response.data.id;
            
            // Clear form fields
            setName('');
            setDate('');
            setSteps('');
            setCaloriesBurned('');
            setDistanceCovered('');
      
            // Show success notification
            setShowNotification({ type: 'success', text: `track "${response.data.name}" added successfully!` });
      
            // Navigate to the new person's detail page
            setTimeout(() => navigate(`/detail/${newTrackId}`), 1000); // Wait for 1 seconds before navigating
          } catch (error) {
            console.error('Error adding the track:', error);
            setShowNotification({ type: 'error', text: 'Failed to add the track. Please try again.' });
          }
        };
      
        const handleCloseNotification = () => {
          setShowNotification(null);
        };
      
      
        return (
          <div className="box-container">
            <h2>Add track</h2>
            <form onSubmit={handleSubmit} className="form-container">

              <input type="text" placeholder="Name"  value={name} onChange={(e) => setName(e.target.value)} required className="input-field"/> 

              <input type="date" placeholder="Date" value={date} onChange={(e) => setNumber(e.target.value)} required className="input-field" />

              <input type="number" placeholder="Steps" value={steps} onChange={(e) => setAge(e.target.value)} required className="input-field" />

              <input type="number" placeholder="caloriesBurned" value={caloriesburned} onChange={(e) => setNumber(e.target.value)} required className="input-field" />
              
              <input type="number" placeholder="distanceCovered" value={distancecovered} onChange={(e) => setNumber(e.target.value)} required className="input-field" />
             
              <input type="number" placeholder="weight" value={weight} onChange={(e) => setNumber(e.target.value)} required className="input-field" />
             

              <div className="button-group">
                <button type="submit" className="btn btn-add">Add Track</button>
                <button type="button" className="btn btn-cancel" onClick={() => navigate('/')}>Cancel</button>
              </div>
            </form>
            {showNotification && <Notification message={showNotification} onClose={handleCloseNotification} />}
          </div>
        );
      };
      
      export default TrackAdd;