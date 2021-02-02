import React from "react";
import "./Event.css";
import { Typography } from "@material-ui/core";

function Event({ url, title, timeline, place, description }) {
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
            <Typography paragraph className="card-text">
              {description}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
