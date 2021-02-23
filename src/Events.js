import React, { useState, useEffect } from "react";
import Event from "./Event";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import EventBusyIcon from '@material-ui/icons/EventBusy';
function Events() {
  const { societyId } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (societyId) {
      db.collection("societies")
        .doc(societyId)
        .collection("events")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setEvents(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              event: doc.data(),
            }))
          )
        );
    }
  }, [societyId]);

  return (
    <div className="events">
      <center>
        <h2 className="p-2">Upcoming events</h2>
      </center>
      {events?.length===0
        ? (
          <>
           <div style={{textAlign:"center"}}>
             <img style={{width:"30%", height:"30%",color:"gray", marginBottom:"22px", borderRadius:"20px"}}src="https://cdn.onlinewebfonts.com/svg/img_375010.png" alt="no events till now -_-" />
             {/* <EventBusyIcon /> */}
           </div>
          </>
        )
        : events.map(({ event, id }) => (
            <>
              <Event
                id={id}
                url={event.url}
                title={event.title}
                timeline={event.timestamp}
                place={event.place}
                description={event.description}
              />
              <br />
            </>
          ))}
    </div>
  );
}

export default Events;
