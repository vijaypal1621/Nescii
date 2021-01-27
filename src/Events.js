import React,{useState,useEffect} from 'react';
import './Events.css';
import Event from './Event';
import { useParams } from "react-router-dom";
import db from "./firebase";

function Events() {

  const { societyId } = useParams();
  const [events,setEvents]= useState([]);
    

  useEffect(() => {
    if (societyId) {
        db.collection("societies")
        .doc(societyId)
        .collection("events")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setEvents(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [societyId]);
  console.log(events);

    return (
        <div className='events'>
            <h2>Upcoming events</h2>
            {!events?("No events till now -_- "): (events.map(({ timestamp,description,place,title,url }) => (
          <Event
            url={url}
            title={title}
            timeline={timestamp}
            place={place}
            description={description}
          />
        )))}



            {/* <Event url='https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj'
             title='Street Play' 
             timeline='24 march 2021' 
             place='Netaji Subhash University of technology' />
            <Event url='https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj'
             title='Street Play' 
             timeline='24 march 2021' 
             place='Netaji Subhash University of technology' />
             <Event url='https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj'
             title='Street Play' 
             timeline='24 march 2021' 
             place='Netaji Subhash University of technology' />
            <Event url='https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj'
             title='Street Play' 
             timeline='24 march 2021' 
             place='Netaji Subhash University of technology' />
              */}

            
        </div>
    )
}

export default Events
