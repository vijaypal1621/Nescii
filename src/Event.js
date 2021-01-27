import React from 'react';
import './Event.css';

function Event({url,title,timeline,place,description}) {
    return (
        <div className='event'>
            <img src={url}  alt='title' />
            <div className='event__right'>
                <p style={{color:"red"}}>{new Date(timeline?.toDate()).toUTCString()}</p>
                <h2>{title}</h2>
                <h4>{place}</h4>
            </div>
        </div>
    )
}

export default Event
