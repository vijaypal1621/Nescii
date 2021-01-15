import React from "react";
import "./SocietyMessageSender.css";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import EventIcon from "@material-ui/icons/Event";
// import DescriptionIcon from "@material-ui/icons/Description";
import { Avatar, Button, IconButton } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import CloseRoundedIcon from "@material-ui/icons/CancelRounded";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 - rand();
  const left = 50 - rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    display: "none",
  },
}));

function SocietyMessageSender() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="modal__top">
        <h2 id="simple-modal-title">Create Post</h2>
        <Button onClick={handleClose}>
          <CloseRoundedIcon />
        </Button>
      </div>
      <hr />
      <div className="modal__profile">
        <Avatar />
        <h4 className="modal__title">....user....</h4>
      </div>
      <div style={{ maxWidth: "100%", maxHeight: "200px" }}>
        <textarea
          className="modal__input"
          rows="10"
          cols="20"
          style={{ width: "100%" }}
          placeholder="Whats on your mind?"
        />
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
      <Button
        className="post__button"
        style={{ color: "white", backgroundColor: "#16a596" }}
      >
        Post
      </Button>
      {/* <SimpleModal /> */}
    </div>
  );

  return (
    <div className="message">
      <div className="messageSender__top">
        <Avatar />
        <button type="button" onClick={handleOpen}>
          What's on Your Mind?
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <input
            accept="image/*"
            className={classes.input}
            id="postImage"
            multiple
            type="file"
          />
          <label htmlFor="postImage" style={{ display: "inline-flex" }}>
            <IconButton color="primary" component="div">
              <InsertPhotoIcon style={{ color: "green" }} />
            </IconButton>
            <h3 style={{ margin: "11px" }}>Photo</h3>
          </label>
        </div>
        <div className="messageSender__option">
          <input
            accept="video/*"
            className={classes.input}
            id="postVideo"
            multiple
            type="file"
          />
          <label htmlFor="postVideo" style={{ display: "inline-flex" }}>
            <IconButton color="primary" component="div">
              <PlayCircleFilledIcon style={{ color: "red" }} />
            </IconButton>
            <h3 style={{ margin: "11px" }}>Video</h3>
          </label>
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
