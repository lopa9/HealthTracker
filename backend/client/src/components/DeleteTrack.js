import React from 'react'

const DeleteTrack = ({ id, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm('Sure you want to delete this track?')){
            onDelete(id)
        }
    }
    return(
        <button className='btn btn-delete' onClick={handleDelete}>
            Delete
        </button>
    )
}

export default DeleteTrack ;