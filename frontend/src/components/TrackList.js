// src/components/PersonList.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Notification from './Notification';
import '../styles/TraclerList.css'; // Component-specific styles


const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)


const TrackerList = () => {
  const [track, setTrack] = useState([]);
  const [notification, setNotification] = useState('');


  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get(API_URL);
        setTrack(response.data);
      } catch (error) {
        console.error('Error fetching Track:', error);
      }
    };
    fetchTrack();
  }, []);

  return (
    <div className="tracker-list">
      <h1>Tracker List</h1>
      <Link to="/add" className="btn btn-add add-Track-button">Add Track</Link>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Steps</th>
            <th>CaloriesBurned</th>
            <th>DistanceCovered</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {track.map(track => (
            <tr key={track.id}>
              <td>
                <Link to={`/track/${track.id}`} className="track-name">
                  {track.name}
                </Link>
              </td>
              <td>{track.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {notification && (
        <Notification message={notification} onClose={() => setNotification('')} />
      )}
    </div>
  );
};

export default TrackerList;