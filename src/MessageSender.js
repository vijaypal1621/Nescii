import React, { useState } from "react";
import "./MessageSender.css";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import DescriptionIcon from "@material-ui/icons/Description";
import { Avatar, Button, IconButton, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseRoundedIcon from "@material-ui/icons/CancelRounded";
import { useStateValue } from "./StateProvider";
import ReactPlayer from "react-player";

function rand() {
  return Math.round(Math.random() * 15) - 10;
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
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    display: "none",
  },
}));

function MessageSender() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [video, setVideo] = useState(null);
  const [{ user }] = useStateValue();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePhotoOpen = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      let file = event.target.files[i];
      setPhoto((array) => {
        return [...array, URL.createObjectURL(file)];
      });
    }
  };

  const handlePhotoClose = (file) => {
    setPhoto(photo.filter((photo) => photo !== file));
  };

  const handleVideoClose = () => {
    setVideo(null);
  };

  const handleVideoOpen = (event) => {
    setVideo(URL.createObjectURL(event.target.files[0]));
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="modal__top">
        <h2 id="simple-modal-title">Create Post</h2>
        <Button onClick={handleClose} style={{ outlineWidth: "0px" }}>
          <CloseRoundedIcon />
        </Button>
      </div>
      <hr />
      <div className="modal__profile">
        <Avatar src={user?.photoURL} alt={user?.displayName} />
        <h4 className="modal__title">{user?.displayName}</h4>
      </div>
      <div
        style={{
          maxWidth: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: "300px",
        }}
      >
        <textarea
          className="modal__input"
          rows="5"
          cols="20"
          style={{ width: "100%" }}
          placeholder="Whats on your mind?"
        />
        <div className="modal__input__photo">
          {photo.map((photo) => {
            return (
              <div style={{ position: "relative" }}>
                <Button
                  style={{
                    position: "absolute",
                    color: "grey",
                    outlineWidth: "0px",
                    top: "0",
                    right: "0",
                  }}
                  className="modal__input__photo__button"
                  onClick={() => {
                    handlePhotoClose(photo);
                  }}
                >
                  <CloseRoundedIcon />
                </Button>
                <img
                  src={photo}
                  alt=""
                  style={{ objectFit: "cover", width: "100%" }}
                />
              </div>
            );
          })}
          {video !== null ? (
            <div style={{ position: "relative" }}>
              <Button
                style={{
                  position: "absolute",
                  color: "grey",
                  outlineWidth: "0px",
                  top: "-2rem",
                  right: "0",
                }}
                className="modal__input__photo__button"
                onClick={handleVideoClose}
              >
                <CloseRoundedIcon />
              </Button>
              <ReactPlayer
                url={video}
                width="100%"
                height="100%"
                controls={true}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="messageSender__bottom row">
        <div className="messageSender__option col-4">
          <input
            accept="image/*"
            className={classes.input}
            id="postImage"
            name="postImage"
            multiple
            type="file"
            onChange={handlePhotoOpen}
          />
          <label htmlFor="postImage" className="messageSender__option__label">
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                style={{ padding: "0" }}
                color="primary"
                component="div"
              >
                <InsertPhotoIcon style={{ color: "green" }} />
              </IconButton>
              <h4>Photo</h4>
            </div>
          </label>
        </div>
        <div className="messageSender__option col-4">
          <input
            accept="video/*"
            className={classes.input}
            id="postVideo"
            multiple
            name="postVideo"
            type="file"
            onChange={handleVideoOpen}
          />
          <label htmlFor="postVideo" className="messageSender__option__label">
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                style={{ padding: "0" }}
                color="primary"
                component="div"
              >
                <PlayCircleFilledIcon style={{ color: "red" }} />
              </IconButton>
              <h4>Video</h4>
            </div>
          </label>
        </div>
        <div className="messageSender__option col-4">
          <input accept="" className={classes.input} id="postArticle" />
          <label htmlFor="postEvent" className="messageSender__option__label">
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                style={{ padding: "0" }}
                color="primary"
                component="div"
              >
                <DescriptionIcon style={{ color: "blue" }} />
              </IconButton>
              <h4>Article</h4>
            </div>
          </label>
        </div>
      </div>
      <Button
        className="post__button"
        style={{ color: "white", backgroundColor: "#16a596" }}
      >
        Post
      </Button>
    </div>
  );

  return (
    <>
      <div className="message">
        <div className="messageSender__top">
          <Avatar src={user?.photoURL} alt={user?.displayName} />
          <button type="button" className="p-2" onClick={handleOpen}>
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
        <div className="messageSender__bottom row">
          <div className="messageSender__option col-4">
            <input
              accept="image/*"
              className={classes.input}
              id="postImageIn"
              multiple
              type="file"
              name="postImageIn"
              onChange={handlePhotoOpen}
            />
            <label
              htmlFor="postImageIn"
              className="messageSender__option__label"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  style={{ padding: "0" }}
                  color="primary"
                  component="div"
                >
                  <InsertPhotoIcon style={{ color: "green" }} />
                </IconButton>
                <h4>Photo</h4>
              </div>
            </label>
          </div>
          <div className="messageSender__option col-4">
            <input
              accept="video/*"
              className={classes.input}
              id="postVideoIn"
              multiple
              type="file"
              name="postVideoIn"
              onChange={handleVideoOpen}
            />
            <label
              htmlFor="postVideoIn"
              className="messageSender__option__label"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  style={{ padding: "0" }}
                  color="primary"
                  component="div"
                >
                  <PlayCircleFilledIcon style={{ color: "red" }} />
                </IconButton>
                <h4>Video</h4>
              </div>
            </label>
          </div>

          <div className="messageSender__option col-4">
            <input accept="" className={classes.input} id="postArticleIn" />
            <label htmlFor="postEvent" className="messageSender__option__label">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  style={{ padding: "0" }}
                  color="primary"
                  component="div"
                >
                  <DescriptionIcon style={{ color: "blue" }} />
                </IconButton>
                <h4>Article</h4>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageSender;
