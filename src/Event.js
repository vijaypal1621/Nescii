import React ,{useEffect}from "react";
import "./Event.css";
import { IconButton, Typography } from "@material-ui/core";
import TodayIcon from '@material-ui/icons/Today';
import firebase from 'firebase';
import {useParams} from 'react-router-dom';
import {db} from './firebase';
import Calendar from "./googleCalendar";

function Event({ id,url, title, timeline, place, description }) {
  const societyId= useParams();
  const handleClick = ({ url, title, timeline, place, description }) => {
    var gapi = window.gapi;
    gapi.load("client:auth2", () => {
      console.log("loaded client");
      gapi.client.init({
        apiKey: Calendar.api_key,
        clientId: Calendar.client_id,
        discoveryDocs: Calendar.discovery_docs,
        scope: Calendar.scopes,
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

  useEffect(() => {
    
    var x=new Date(timeline?.toDate())
    var y=new Date();
    if(x < y && societyId.societyId !== null){
      db.collection("societies")
        .doc(societyId.societyId)
        .collection("events")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Event successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }



  }, [])

  return (
    <div
      className="card container"
      style={{ borderWidth: "medium", borderColor: "yellowgreen" }}
    >
      <div className="row">
        <div className="col-3 p-0">
          <img
            className="card-img img-fluid"
            src={url}
            alt={title}
            style={{
              minWidth: "100%",
            }}
          />
        </div>
        <div className="col-8 p-0">
          <div className="card-body" style={{padding:"4px 0px 4px 4px"}}>
            <Typography
              variant="subtitle1"
              color="secondary"
              className="card-text pr-4"
            >
              {new Date(timeline?.toDate()).toUTCString()}
              
            </Typography>
            <Typography variant="subtitle2" className="card-text">
              {place}
            </Typography>
            <Typography paragraph className="card-text mb-0">
              {description}
            </Typography>
            
          </div>
        </div>
        <div className="col-1" style={{padding:"0px"}}>
        <IconButton style={{padding:"0px", color:"blue"}}
              onClick={() => {
                handleClick({ url, title, timeline, place, description });
              }}
            >
              <TodayIcon  />
            </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Event;
