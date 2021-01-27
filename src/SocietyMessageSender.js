import React, { useState } from "react";
import "./SocietyMessageSender.css";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import EventIcon from "@material-ui/icons/Event";
// import DescriptionIcon from "@material-ui/icons/Description";
import DateFnsUtils from "@date-io/date-fns";
import { useParams } from "react-router-dom";
import {storage, db} from './firebase';

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
  const [eventPhoto,setEventPhoto]= useState(null);
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
      if(e.target.files[0]){
        setEventPhoto(e.target.files[0]);
    }
  }

  // const handleVideoOpen = (event) => {

  // var source = document.getElementById('video_here');
  // source[0].src = URL.createObjectURL(event.files[0]);
  // source.parent()[0].load();
  // };

  
const handleEventSubmit = (e) => {
  e.preventDefault();
  if(token==='nescii@102' || token==='nescii@101'){
    console.log(societyId);
    if(societyId){
      const uploadTask = storage.ref(`images/${eventPhoto.name}`).put(eventPhoto);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
            // progress function
            
            
        },
        (error)=> {
            // error function...
            console.log(error);
            alert(error.message);
        },
        () => {
            // complete function
            storage
                   .ref('images')
                   .child(eventPhoto.name)
                   .getDownloadURL()
                   .then(url => {
                       //post image inside db
                       db.collection('societies').doc(societyId)
                          .collection('events').add({
                                description:eventDescription,
                                timestamp:date,
                                place:place,
                                title:eventTitle,
                                url:url,
                            }
                        )
                        .then(function() {
                          console.log("Document successfully updated!");
                          })
                          .catch(function(error) {
                              // The document probably doesn't exist.
                              console.error("Error updating document: ", error);
                          });
                   })
        }
      )

        //dcdhcgd
      
  
    console.log(
      eventTitle,
      eventDescription,
      date,
      start,
      eventPhoto,
      token
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
        <Avatar />
        <h4 className="modal__title">....user....</h4>
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
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <input
            accept="image/*"
            className={classes.input}
            id="postImage"
            multiple
            type="file"
            onChange={handlePhotoOpen}
          />
          <label htmlFor="postImage" style={{ display: "inline-flex" }}>
            <IconButton color="primary" component="div">
              <InsertPhotoIcon style={{ color: "green" }} />
            </IconButton>
            <h3 style={{ margin: "11px" }}>Photo</h3>
          </label>
        </div>
        <div className="messageSender__option">
          {/* 

          {/* <PlayCircleFilledIcon style={{ color: "red" }} />
          <h3>Video</h3> */}
          {/* <input accept="video/*" type="file" alt="/"  className="video__input"/>
           */}

          <input
            accept="video/*"
            className={classes.input}
            id="postVideo"
            multiple
            type="file"
            name="file[]"
            onChange={handlePhotoOpen}
          />
          <label htmlFor="postVideo" style={{ display: "inline-flex" }}>
            <IconButton color="primary" component="div">
              <PlayCircleFilledIcon style={{ color: "red" }} />
            </IconButton>
            <h3 style={{ margin: "11px" }}>Video</h3>
          </label>
        </div>

        <div className="messageSender__option">
          <input accept="" className={classes.input} id="postEvent" />
          <label htmlFor="postEvent" style={{ display: "inline-flex" }}>
            <IconButton color="primary" component="div">
              <EventIcon style={{ color: "gray" }} />
            </IconButton>
            <h3 style={{ margin: "11px" }}>Event</h3>
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
          <form
            autoComplete="off"
            onSubmit={handleEventSubmit}
          >
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
              <h5 style={{color:"gray", fontWeight:"500"}}>Event Image</h5>
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
              onChange={handlePhotoOpen}
            />
            <label htmlFor="postImage" style={{ display: "inline-flex" }}>
              <IconButton color="primary" component="div">
                <InsertPhotoIcon style={{ color: "green" }} />
              </IconButton>
              <h3 style={{ margin: "11px" }}>Photo</h3>
            </label>
          </div>
          <div className="messageSender__option">
            {/* 

          {/* <PlayCircleFilledIcon style={{ color: "red" }} />
          <h3>Video</h3> */}
            {/* <input accept="video/*" type="file" alt="/"  className="video__input"/>
             */}

            <input
              accept="video/*"
              className={classes.input}
              id="postVideo"
              multiple
              type="file"
              name="file[]"
              onChange={handlePhotoOpen}
            />
            <label htmlFor="postVideo" style={{ display: "inline-flex" }}>
              <IconButton color="primary" component="div">
                <PlayCircleFilledIcon style={{ color: "red" }} />
              </IconButton>
              <h3 style={{ margin: "11px" }}>Video</h3>
            </label>
          </div>

          <div className="messageSender__option">
            <input accept="" className={classes.input} id="postEvent" />
            <label htmlFor="postEvent" style={{ display: "inline-flex" }}>
              <IconButton
                color="primary"
                component="div"
                onClick={handleEventModalOpen}
              >
                <EventIcon style={{ color: "gray" }} />
              </IconButton>
              <h3 style={{ margin: "11px" }}>Event</h3>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocietyMessageSender;
