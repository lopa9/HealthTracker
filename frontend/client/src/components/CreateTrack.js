import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import axios from 'axios';

const CreateTrack = (props) => {
  const navigate = useNavigate();
  const [track, setTrack] = useState({
   
  });
  const [showToast, setShowToast] = useState(false);

  const onChange = (e) => {
    setTrack({ ...track, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // axios
    //   .post('/api/books', book)
    //   .then((res) => {
    //     setBook({
    //       title: '',
    //       isbn: '',
    //       author: '',
    //       description: '',
    //       published_date: '',
    //       publisher: '',
    //     });

        
        toast.success('Track added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });

    
        setTimeout(() => {
          setShowToast(false); // Hide the toast
          navigate('/'); // Navigate to homepage
        }, 5000); 

    }
      

  return (
    <div className='CreateTrack'>
      { }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />

      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Track List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Track</h1>
            <p className='lead text-center'>Create new track</p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name of the Track'
                  name='name'
                  className='form-control'
                  value={track.name}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='date'
                  placeholder='Date'
                  name='date'
                  className='form-control'
                  value={track.date}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='number'
                  placeholder='Steps'
                  name='steps'
                  className='form-control'
                  value={track.steps}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='number'
                  placeholder='caloriesburned'
                  name='caloriesburned'
                  className='form-control'
                  value={track.caloriesburned}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='distancecovered'
                  placeholder='Distancecovered'
                  name='distancecovered'
                  className='form-control'
                  value={track.distancecovered}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='number'
                  placeholder='weight'
                  name='weight'
                  className='form-control'
                  value={track.weight}
                  onChange={onChange}
                />
              </div>
              <br />

              <input
                type='submit'
                className='btn btn-outline-warning btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>


    </div>
  );
};

export default CreateTrack;