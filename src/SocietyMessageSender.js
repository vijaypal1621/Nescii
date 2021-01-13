import React from "react";
import "./SocietyMessageSender.css";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import EventIcon from "@material-ui/icons/Event";
// import DescriptionIcon from "@material-ui/icons/Description";
import { Avatar } from "@material-ui/core";

function SocietyMessageSender() {
  return (
    <div className="message">
      <div className="messageSender__top">
        <Avatar />
          <button>What's on Your Mind?</button>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <InsertPhotoIcon style={{ color: "green" }} />
          <h3>Photo</h3>
        </div>
        <div className="messageSender__option">
          <PlayCircleFilledIcon style={{ color: "red" }} />
          <h3>Video</h3>
        </div>

        <div className="messageSender__option">
          <EventIcon style={{ color: "orange" }} />
          <h3>Event</h3>
        </div>
      </div>
    </div>
  );
}

export default SocietyMessageSender;
