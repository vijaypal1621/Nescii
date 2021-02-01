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
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [{ user }] = useStateValue();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePhotoOpen = (event) => {
    console.log(event.target);
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const RemoveSelectedFile = () => {
    const x = document.getElementById("postImage");
    const y = document.getElementById("postVideo");
    y.value = "";
    x.value = "";
  };

  const handlePhotoClose = () => {
    setPhoto(null);
    setVideo(null);
    RemoveSelectedFile();
  };

  const handleVideoOpen = (event) => {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        console.log("loaded");
        //videoSrc.src = e.target.result
        //videoTag.load()
        setVideo(e.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
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
          <Button
            style={{ position: "absolute", color: "white" }}
            className="modal__input__photo__button"
            onClick={handlePhotoClose}
          >
            <CloseRoundedIcon />
          </Button>
          <img src={photo} alt="" />
          {/* <video controls id="video-tag">
            <source id="video-source" src="">
              Your browser does not support the video tag.
            </source>
          </video> */}
          <ReactPlayer url={video} width="100%" height="100%" controls={true} />
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
          <input accept="" className={classes.input} id="postEvent" />
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
      {/* <SimpleModal /> */}
    </div>
  );

  return (
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
          <label htmlFor="postImageIn" className="messageSender__option__label">
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
          <label htmlFor="postVideoIn" className="messageSender__option__label">
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
          <input accept="" className={classes.input} id="postEvent" />
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
  );
}

export default MessageSender;
