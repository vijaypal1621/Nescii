import React, { useState } from "react";
import "./SocietyMessageSender.css";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import EventIcon from "@material-ui/icons/Event";
import DateFnsUtils from "@date-io/date-fns";
import { useParams } from "react-router-dom";
import { storage, db } from "./firebase";
import {
  Avatar,
  Button,
  IconButton,
  Modal,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import CloseRoundedIcon from "@material-ui/icons/CancelRounded";
import { useStateValue } from "./StateProvider";
function rand() {
  return Math.round(Math.random() * 16) - 10;
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
    width: 340,
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
  const [{ user }] = useStateValue();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [eventModal, setEventModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [place, setPlace] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [token, setToken] = useState("");
  const [eventPhoto, setEventPhoto] = useState(null);
  const { societyId } = useParams();
  const handleEventModalOpen = () => {
    setEventModal(true);
  };

  const handleEventModalClose = () => {
    setEventModal(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePhotoOpen = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    setOpen(true);
  };

  const handleVideoOpen = (evt) => {
    var reader = new window.FileReader(),
      file = evt.target.files[0],
      url;

    reader = window.URL || window.webKitURL;

    if (reader && reader.createObjectURL) {
      url = reader.createObjectURL(file);
      video.src = url;
      reader.revokeObjectURL(url); //free up memory
      return;
    }

    if (!window.FileReader) {
      console.log("Sorry, not so much");
      return;
    }

    reader = new window.FileReader();
    reader.onload = function (evt) {
      video.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleStartChange = (date) => {
    setStart(date);
  };

  // const handleEndChange = (date) => {
  //   setEnd(date);
  // };

  const RemoveSelectedFile = () => {
    const x = document.getElementById("postImage");
    x.value = "";
  };

  const handlePhotoClose = () => {
    setPhoto(null);
    RemoveSelectedFile();
  };

  const handleEventImage = (e) => {
    if (e.target.files[0]) {
      setEventPhoto(e.target.files[0]);
    }
  };

  // const handleVideoOpen = (event) => {

  // var source = document.getElementById('video_here');
  // source[0].src = URL.createObjectURL(event.files[0]);
  // source.parent()[0].load();
  // };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (token === "nescii@102" || token === "nescii@101") {
      console.log(societyId);
      if (societyId) {
        const uploadTask = storage
          .ref(`images/${eventPhoto.name}`)
          .put(eventPhoto);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // progress function
          },
          (error) => {
            // error function...
            console.log(error);
            alert(error.message);
          },
          () => {
            // complete function
            storage
              .ref("images")
              .child(eventPhoto.name)
              .getDownloadURL()
              .then((url) => {
                //post image inside db
                db.collection("societies")
                  .doc(societyId)
                  .collection("events")
                  .add({
                    description: eventDescription,
                    timestamp: date,
                    place: place,
                    title: eventTitle,
                    url: url,
                  })
                  .then(function () {
                    console.log("Document successfully updated!");
                  })
                  .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                  });
              });
          }
        );
      }
    }
    handleEventModalClose();
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
          {video != null ? (
            <video width="400" controls>
              <source src="mov_bbb.mp4" id="video_here" />
              Your browser does not support HTML5 video.
            </video>
          ) : (
            <> </>
          )}
        </div>
      </div>
      <div className="messageSender__bottom row">
        <div className="messageSender__option col-6">
          <input
            accept="image/*"
            className={classes.input}
            id="postImage"
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
        <div className="messageSender__option col-6">
          <input
            accept="video/*"
            className={classes.input}
            id="postVideo"
            multiple
            type="file"
            name="file[]"
            onChange={handlePhotoOpen}
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
    <>
      <Modal
        open={eventModal}
        onClose={handleEventModalClose}
        style={{
          display: "grid",
          placeItems: "center",
          overflowY: "scroll",
          marginTop: "3rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
          }}
        >
          <form autoComplete="off" onSubmit={handleEventSubmit}>
            <div>
              <h1>
                <center>Event</center>
              </h1>
              <TextField
                color="secondary"
                fullWidth
                id="eventTitle"
                label="Event Title"
                required
                value={eventTitle}
                onChange={(e) => {
                  setEventTitle(e.target.value);
                }}
              />

              <TextField
                color="secondary"
                margin="normal"
                fullWidth
                multiline
                id="eventDescription"
                label="Event Description"
                required
                value={eventDescription}
                onChange={(e) => {
                  setEventDescription(e.target.value);
                }}
              />
              <TextField
                color="secondary"
                fullWidth
                id="eventTitle"
                label="Event Place"
                required
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                }}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date"
                  value={date}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <br />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Start"
                  value={start}
                  onChange={handleStartChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
                <br />
                {/* <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="End"
                  // value={end}
                  onChange={handleEndChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                /> */}
              </MuiPickersUtilsProvider>
              <TextField
                color="secondary"
                margin="normal"
                fullWidth
                id="token"
                label="Token"
                required
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                }}
              />
              <label htmlFor="EventImage">
                <h5 style={{ color: "gray", fontWeight: "500" }}>
                  Event Image
                </h5>
              </label>
              <input
                accept="image/*"
                id="EventImage"
                multiple
                type="file"
                onChange={handleEventImage}
              />
              <center>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginTop: "2rem" }}
                >
                  Submit
                </Button>
              </center>
            </div>
          </form>
        </div>
      </Modal>
      <div className="message">
        <div className="messageSender__top">
          <Avatar src={user?.photoURL} alt={user?.displayName} />
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
        <div className="messageSender__bottom row">
          <div className="messageSender__option col-4">
            <input
              accept="image/*"
              className={classes.input}
              id="postImage"
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
              type="file"
              name="file[]"
              onChange={handlePhotoOpen}
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
                  onClick={handleEventModalOpen}
                  color="primary"
                  component="div"
                >
                  <EventIcon style={{ color: "gray" }} />
                </IconButton>
                <h4>Event</h4>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocietyMessageSender;
