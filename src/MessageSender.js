import React from "react";
import "./MessageSender.css";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
// import EventIcon from "@material-ui/icons/Event";
import DescriptionIcon from "@material-ui/icons/Description";
import { Avatar } from "@material-ui/core";

function MessageSender() {
  return (
    <div className="message">
      <div className="messageSender__top">
        <Avatar />
        <form>
          <label style={{ display: "none" }} htmlFor="mind">
            What's on Your Mind?
          </label>
          <input placeholder="What's on Your Mind?" name="mind" id="mind" />
          <button type="submit">Hidden Submit</button>
        </form>
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
          <DescriptionIcon style={{ color: "orange" }} />
          <h3>Article</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
