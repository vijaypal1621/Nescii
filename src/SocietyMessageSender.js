import React, { useState, useEffect } from "react";
import "./SocietyMessageSender.css";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import EventIcon from "@material-ui/icons/Event";
import DateFnsUtils from "@date-io/date-fns";
import { useParams } from "react-router-dom";
import { storage, db } from "./firebase";
import ReactPlayer from "react-player";
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
import firebase from "firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

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

function SocietyMessageSender({ title, imageURL }) {
  const classes = useStyles();
  const [{ user }] = useStateValue();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState([]);
  const [video, setVideo] = useState(null);
  const [photosURL, setPhotosURL] = useState([]);
  const [videoURL, setVideoURL] = useState(null);
  const [eventModal, setEventModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [place, setPlace] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [token, setToken] = useState("");
  const [tokens, setTokens] = useState({});
  const [eventPhoto, setEventPhoto] = useState(null);
  const { societyId } = useParams();

  //for token collection
  useEffect(() => {
    db.collection("token")
      .doc("token@nescii-101")
      .onSnapshot((snapshot) => setTokens(snapshot.data()));
  }, [title]);

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
    setOpen(true);
    for (let i = 0; i < event.target.files.length; i++) {
      let file = event.target.files[i];
      setPhoto((array) => {
        return [...array, URL.createObjectURL(file)];
      });
      setPhotosURL((arr) => {
        // console.log(file);
        return [...arr, file];
      });
    }
  };

  const handleVideoOpen = (event) => {
    if (event.target.files[0]) {
      setVideo(URL.createObjectURL(event.target.files[0]));
      setVideoURL(event.target.files[0]);
    }
    setOpen(true);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (user?.email.includes("@nsut.ac.in") === false) {
      alert("Not a NSUT student! Please sign in with NSUT id to continue.");
    } else if (user?.emailVerified === false) {
      alert("Please verify your email id first!");
    } else {
      if (videoURL !== null) {
        const uploadTask = storage.ref(`videos/${videoURL.name}`).put(videoURL);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // progress function
            // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Video Upload is ' + progress + '% done');
            // setProgress(progress);
          },
          (error) => {
            // error function...
            // console.log(error);
            alert(error.message);
          },
          () => {
            // complete function
            storage
              .ref("videos")
              .child(videoURL?.name)
              .getDownloadURL()
              .then((url) => {
                // console.log(url + " video url is generated");
                // console.log(finalVideo + " Finalvideo url is saved") ;
                //post image inside db
                db.collection("societies")
                  .doc(societyId)
                  .collection("posts")
                  .add({
                    message: caption,
                    profilePic: user?.photoURL,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    username: user?.displayName,
                    video: url,
                    uid: user?.uid,
                  })
                  .then((docRef) => {
                    if (photosURL.length !== 0) {
                      const promises = photosURL.map((file) => {
                        const ref = firebase
                          .storage()
                          .ref()
                          .child(`societyImages/${file.name}`);
                        return ref.put(file).then(() => ref.getDownloadURL());
                      });
                      Promise.all(promises)
                        .then((fileDownloadUrls) => {
                          db.collection("societies")
                            .doc(societyId)
                            .collection("posts")
                            .doc(docRef.id)
                            .update({
                              message: caption,
                              profilePic: user?.photoURL,
                              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                              username: user?.displayName,
                              images: fileDownloadUrls,
                            })
                            .then(function () {
                              // Post Successfully Submitted!
                            })
                            .catch(function (error) {
                              // The document probably doesn't exist.
                              console.error("Error updating document: ", error);
                            });
                        })
                        .catch((err) => console.log(err));
                    }
                    // console.log("Video Successfully Submitted!");
                  })
                  .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                  });
              });
          }
        );
        //  console.log(finalVideo) ;
        //  console.log(finalPhotos);
      } else if (photosURL.length !== 0) {
        const promises = photosURL.map((file) => {
          const ref = firebase.storage().ref().child(`homeImages/${file.name}`);
          return ref.put(file).then(() => ref.getDownloadURL());
        });
        Promise.all(promises)
          .then((fileDownloadUrls) => {
            db.collection("societies")
              .doc(societyId)
              .collection("posts")
              .add({
                message: caption,
                profilePic: user?.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user?.displayName,
                images: fileDownloadUrls,
                uid: user?.uid,
              })
              .then(function () {
                // console.log("Post Successfully Submitted!");
              })
              .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
          })
          .catch((err) => console.log(err));
      } else if (caption !== "") {
        db.collection("societies")
          .doc(societyId)
          .collection("posts")
          .add({
            message: caption,
            profilePic: user?.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            username: user?.displayName,
            uid: user?.uid,
          })
          .then(function () {
            // Post Successfully Submitted!
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      } else {
        alert("Post is empty !");
      }
    }
    setVideoURL(null);
    setVideo(null);
    setCaption("");
    setOpen(false);
    setPhotosURL([]);
    setPhoto([]);
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

  const handlePhotoClose = (file) => {
    setPhoto(photo.filter((photo) => photo !== file));
  };

  const handleEventImage = (e) => {
    if (e.target.files[0]) {
      setEventPhoto(e.target.files[0]);
    }
  };
  const handleVideoClose = () => {
    setVideo(null);
  };

  // const handleVideoOpen = (event) => {

  // var source = document.getElementById('video_here');
  // source[0].src = URL.createObjectURL(event.files[0]);
  // source.parent()[0].load();
  // };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (token === tokens.society[title]) {
      // console.log(societyId);
      if (societyId) {
        if (eventPhoto !== null) {
          const uploadTask = storage
            .ref(`eventImages/${eventPhoto?.name}`)
            .put(eventPhoto);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // progress function
            },
            (error) => {
              // error function...
              // console.log(error);
              alert(error.message);
            },
            () => {
              // complete function
              storage
                .ref("eventImages")
                .child(eventPhoto.name)
                .getDownloadURL()
                .then((url) => {
                  //post image inside db
                  db.collection("societies")
                    .doc(societyId)
                    .collection("events")
                    .add({
                      description: eventDescription,
                      message: caption,
                      timestamp: date,
                      place: place,
                      title: eventTitle,
                      url: url,
                      uid: user?.uid,
                    })
                    .then(function () {
                      // Document successfully updated!
                    })
                    .catch(function (error) {
                      // The document probably doesn't exist.
                      console.error("Error updating document: ", error);
                    });
                });
            }
          );
        } else {
          db.collection("societies")
            .doc(societyId)
            .collection("events")
            .add({
              description: eventDescription,
              message: caption,
              timestamp: date,
              place: place,
              title: eventTitle,
              url: imageURL,
              uid: user?.uid,
            })
            .then(function () {
              // Document successfully updated!
            })
            .catch(function (error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
      }
    } else {
      alert(
        `Society Token did not match! Please contact ${title} Society head.   `
      );
    }
    handleEventModalClose();
  };

  const body = (
    <div style={modalStyle} className="col-10 col-md-4 bg-light pt-1 pb-3">
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
          className="modal__input pl-2"
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value);
          }}
          rows="5"
          cols="20"
          style={{ width: "100%" }}
          placeholder=" Whats on your mind?"
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
                  top: "0",
                  right: "-46px",
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
      </div>
      <Button
        className="post__button"
        onClick={handlePostSubmit}
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
