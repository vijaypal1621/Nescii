import React from "react";
import "./Event.css";
import { IconButton, Typography } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { client_id, api_key, scopes, discovery_docs } from "./googleCalendar";

function Event({ url, title, timeline, place, description }) {
  const handleClick = ({ url, title, timeline, place, description }) => {
    var gapi = window.gapi;
    gapi.load("client:auth2", () => {
      console.log("loaded client");
      gapi.client.init({
        apiKey: api_key,
        clientId: client_id,
        discoveryDocs: discovery_docs,
        scope: scopes,
      });
      gapi.client.load("calendar", "v3", () => {
        console.log("calendar loaded");
      });
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: title,
            location: place,
            description: description,
            start: {
              dateTime: new Date(timeline?.toDate()).toISOString().slice(0, -5),
              timeZone: "Asia/Kolkata",
            },
            end: {
              dateTime: "2021-05-28T17:00:00",
              timeZone: "Asia/Kolkata",
            },
            // attendees: [{ email: "lpage@example.com" }],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            window.open(event.htmlLink);
          });
        });
    });
  };

  return (
    <div
      className="card container"
      style={{ borderWidth: "medium", borderColor: "yellowgreen" }}
    >
      <div className="row">
        <div className="col-5 p-0">
          <img
            className="card-img img-fluid"
            src={url}
            alt={title}
            style={{
              minWidth: "100%",
            }}
          />
        </div>
        <div className="col-7 p-0">
          <div className="card-body">
            <Typography
              variant="subtitle1"
              color="secondary"
              className="card-text"
            >
              {new Date(timeline?.toDate()).toUTCString()}
            </Typography>
            <Typography variant="subtitle2" className="card-text">
              {place}
            </Typography>
            <Typography paragraph className="card-text">
              {description}
            </Typography>
            <IconButton
              onClick={() => {
                handleClick({ url, title, timeline, place, description });
              }}
            >
              <CalendarTodayIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
