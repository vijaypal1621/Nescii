import React, { useState, useEffect } from "react";
import "./Events.css";
import Event from "./Event";
import { useParams } from "react-router-dom";
import { db } from "./firebase";

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
          setEvents(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [societyId]);

  return (
    <div className="events">
      <center>
        <h2>Upcoming events</h2>
      </center>
      {!events
        ? "No events till now -_- "
        : events.map(({ timestamp, description, place, title, url }) => (
            <>
              <Event
                url={url}
                title={title}
                timeline={timestamp}
                place={place}
                description={description}
              />
              <br />
            </>
          ))}
    </div>
  );
}

export default Events;
