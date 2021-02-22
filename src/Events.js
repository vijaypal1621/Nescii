import React, { useState, useEffect } from "react";
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
      {!events
        ? "No events till now -_- "
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
