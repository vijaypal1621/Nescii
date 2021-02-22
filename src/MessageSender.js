import React, { useState } from "react";
import "./MessageSender.css";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import {
  Avatar,
  Button,
  IconButton,
  Modal,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseRoundedIcon from "@material-ui/icons/CancelRounded";
import { useStateValue } from "./StateProvider";
import ReactPlayer from "react-player";
import firebase from "firebase";
import { db, storage } from "./firebase";

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

function MessageSender() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState([]);
  const [video, setVideo] = useState(null);
  const [photosURL, setPhotosURL] = useState([]);
  const [finalVideo, setFinalVideo] = useState(null);
  const [finalPhotos, setFinalPhotos] = useState([]);
  const [videoURL, setVideoURL] = useState(null);
  const [progress, setProgress] = useState(0);

  const [{ user }] = useStateValue();

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

  const handlePhotoClose = (file) => {
    setPhoto(photo.filter((photo) => photo !== file));
  };

  const handleVideoClose = () => {
    setVideo(null);
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
            setProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(progress);
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
                db.collection("home")
                  .add({
                    message: caption,
                    profilePic: user?.photoURL,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    username: user?.displayName,
                    uid: user?.uid,
                    video: url,
                  })
                  .then((docRef) => {
                    if (photosURL.length !== 0) {
                      const promises = photosURL.map((file) => {
                        const ref = firebase
                          .storage()
                          .ref()
                          .child(`homeImages/${file.name}`);
                        return ref.put(file).then(() => ref.getDownloadURL());
                      });
                      Promise.all(promises)
                        .then((fileDownloadUrls) => {
                          db.collection("home").doc(docRef.id).update({
                            message: caption,
                            profilePic: user?.photoURL,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            username: user?.displayName,
                            images: fileDownloadUrls,
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
      } else if (photosURL.length !== 0) {
        const promises = photosURL.map((file) => {
          const ref = firebase.storage().ref().child(`homeImages/${file.name}`);
          return ref.put(file).then(() => ref.getDownloadURL());
        });
        Promise.all(promises)
          .then((fileDownloadUrls) => {
            db.collection("home").add({
              message: caption,
              profilePic: user?.photoURL,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username: user?.displayName,
              images: fileDownloadUrls,
              uid: user?.uid,
            });
          })
          .catch((err) => console.log(err));
      } else if (caption !== "") {
        db.collection("home").add({
          message: caption,
          profilePic: user?.photoURL,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          username: user?.displayName,
          uid: user?.uid,
        });
      } else {
        alert("Post is empty !");
      }
    }
    setVideoURL(null);
    setVideo(null);
    setCaption("");
    setOpen(false);
    setFinalPhotos([]);
    setFinalVideo(null);
    setPhotosURL([]);
    setPhoto([]);
  };

  const body = (
    <div style={modalStyle} className="col-10 col-md-4 bg-light pt-1 pb-3">
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
        <div className="messageSender__option col-6">
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
      </div>
      <Button
        className="post__button"
        onClick={handlePostSubmit}
        style={{ color: "white", backgroundColor: "#16a596" }}
      >
        Post
      </Button>
    </div>
  );

  return (
    <>
      {progress > 0 && progress < 100 ? (
        <Modal
          open={progress}
          style={{
            display: "grid",
            placeItems: "center",
            overflowY: "scroll",
            marginTop: "3rem",
            marginBottom: "3rem",
          }}
        >
          <center>
            <CircularProgress
              variant="determinate"
              value={progress}
              size="5rem"
              thickness={5}
              color="secondary"
            />
          </center>
        </Modal>
      ) : null}
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
          <div className="messageSender__option col-6">
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
          <div className="messageSender__option col-6">
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
        </div>
      </div>
    </>
  );
}

export default MessageSender;
