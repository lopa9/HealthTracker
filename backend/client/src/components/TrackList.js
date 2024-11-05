import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Notification from './Notification';

const API_URL = process.env.REACT_APP_API_URL

const TrackList = () => {
  const [track, setTrack] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get(API_URL);
        settrack(response.data);
      } catch (error) {
        console.error('Error fetching Track:', error);
      }
    };
    fetchTrack();
  }, []);

  return (
    <div className="box-container">
      <h1>All Tracks List</h1>
      <Link to="/add" className="btn btn-add add-person-button">Add Track</Link>
      <table>
        <thead>
          <tr>
            <th>date</th>
            <th>step </th>
            <th>caloriesBurned</th>
            <th>distanceCovered</th>
            <th>weight</th>
          </tr>
        </thead>
        <tbody>
          {track.map(track => (<tr key={track.id} className="track-name"><td>
                <Link to={`/detail/${track.id}`}>{track.step}</Link></td>
                <td> </td>
              <td>{track.distanceCovered}</td>
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

export default TrackList;