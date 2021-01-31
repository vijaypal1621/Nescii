import React from "react";
import "./Event.css";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

function Event({ url, title, timeline, place, description }) {
  return (
    // <Card className="event">
    //   <CardHeader title={title} subheader={place}></CardHeader>
    //   <CardMedia
    //     image={url}
    //     style={{
    //       height: "3rem",
    //     }}
    //   />
    //   <CardContent>
    //     <Typography paragraph>
    //       {new Date(timeline?.toDate()).toUTCString()}
    //     </Typography>
    //   </CardContent>
    //   {/* <img src={url}  alt='title' /> */}
    //   {/* <div className='event__right'> */}
    //   {/* <p style={{color:"red"}}>{new Date(timeline?.toDate()).toUTCString()}</p> */}
    //   {/* <h2>{title}</h2> */}
    //   {/* <h4>{place}</h4> */}
    //   {/* </div> */}
    // </Card>
    <div className="card container">
      <div className="row">
        <div className="col-4 p-0">
          <img
            className="card-img img-fluid"
            src={url}
            alt={title}
            style={{ height: "auto", minWidth: "100%", marginTop: "20%" }}
          />
        </div>
        <div className="col-8 p-0">
          <div className="card-body">
            <p className="card-text">
              {new Date(timeline?.toDate()).toUTCString()}
            </p>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
