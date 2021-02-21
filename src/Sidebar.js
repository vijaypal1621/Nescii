import { Avatar, InputLabel, Modal, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import { useStateValue } from "./StateProvider";
import Popover from "@material-ui/core/Popover";
import firebase from "firebase";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Tooltip } from "@material-ui/core";
import { auth } from "./firebase";
import { db, storage } from "./firebase";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

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

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const useModalStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Sidebar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const modalClasses = useModalStyles();
  const ref = useRef(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [openModal, setOpenModal] = React.useState(false);
  const [{ user }] = useStateValue();
  const [profile, setProfile] = useState(null);

  const [photo, setPhoto] = useState(user?.photoURL);
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");

  const handlePopClick = (event) => {
    if (user?.email.includes("@nsut.ac.in") === true) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handlePopClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (user?.email.includes("@nsut.ac.in") === true) {
      db.collection("users")
        .doc(user?.uid)
        .onSnapshot((snapshot) => {
          setProfile(snapshot.data());
        });
    }
  }, [user?.email, user?.uid]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handlePhotoUpdate = () => {
    const uploadTask = storage.ref(`userImages/${photo.name}`).put(photo);
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
          .ref("userImages")
          .child(photo.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            firebase
              .auth()
              .currentUser.updateProfile({
                photoURL: url,
              })
              .then(function () {
                alert("Updated Successfully");
              })
              .catch(function (error) {
                alert("-_- Failed to Upload");
              });
          });
      }
    );
    setAnchorEl(null);
  };

  const handleVerification = () => {
    var user = firebase.auth().currentUser;

    user
      .sendEmailVerification()
      .then(function () {
        alert("Verification email sent to your email id!");
      })
      .catch(function (error) {
        alert("error " + error.message);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    db.collection("users").doc(user?.uid).update({
      year: year,
      branch: branch,
      section: section,
    });
    setBranch("");
    setSection("");
    setYear("");
    setOpenModal(false);
    // alert(section);
  };
  const body = (
    <div style={modalStyle} className={modalClasses.paper}>
      <div className="">
        <form>
          <div className="row">
            <label className="col-3" for="branch">
              Branch :
            </label>
            <select
              className="col-8 profile__update"
              name="branch"
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option selected>Select Branch</option>
              <option value="Bio-Technology (BT)">Bio-Technology (BT)</option>
              <option value="Computer Engineering (COE)">
                Computer Engineering (COE)
              </option>
              <option value="Computer Science and Engineering(CSAI)">
                Computer Science and Engineering(CSAI)
              </option>
              <option value="Computer Science and Engineering(CSDS)">
                Computer Science and Engineering(CSDS)
              </option>
              <option value="Electronics and Communication Engineering (ECE)">
                Electronics and Communication Engineering (ECE)
              </option>
              <option value="Electronics and Communication Engineering (EIOT)">
                Electronics and Communication Engineering (EIOT)
              </option>
              <option value="Electrical Engineering (EE)">
                Electrical Engineering (EE)
              </option>
              <option value="Information Technology (IT)">
                Information Technology (IT)
              </option>
              <option value="Information Technology (ITNS)">
                Information Technology (ITNS)
              </option>
              <option value="Instrumentation and Control Engineering (ICE)">
                Instrumentation and Control Engineering (ICE)
              </option>
              <option value="Manufacturing Process and Automation Engineering (MPAE)">
                Manufacturing Process and Automation Engineering (MPAE)
              </option>
              <option value="Mathematics and Computing (MAC)">
                Mathematics and Computing (MAC)
              </option>
              <option value="Mechanical Engineering (ME)">
                Mechanical Engineering (ME)
              </option>
            </select>
          </div>
          <div className="row">
            <label className="col-3" for="year">
              Year of Graduation :
            </label>
            <select
              className="col-8 profile__update"
              name="year"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option selected>Select Year of Graduation</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div className="row">
            <label className="col-3" for="section">
              Section :
            </label>
            <select
              className="col-8 profile__update"
              name="section"
              id="section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option selected>Select Section</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <Button
            style={{ color: "white", backgroundColor: "#16a596" }}
            className="col-11 mt-4 ml-2"
            onClick={handleUpdate}
            type="submit"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__card">
        <div className="sidebar__profile">
          <div className="profile__background"></div>
          <div className="profile__image">
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography className={classes.typography}>
                <InputLabel shrink htmlFor="postImage">
                  Photo
                </InputLabel>
                <input
                  accept="image/*"
                  id="postImage"
                  type="file"
                  required
                  onChange={handlePhotoChange}
                />
                <Button
                  style={{ color: "white", backgroundColor: "#16a596" }}
                  onClick={handlePhotoUpdate}
                >
                  Update
                </Button>
              </Typography>
            </Popover>
            <Avatar
              alt={user?.displayName}
              src={user?.photoURL}
              style={{ cursor: "pointer" }}
              ref={ref}
              className={classes.large}
              aria-describedby={id}
              variant="contained"
              color="primary"
              onClick={handlePopClick}
              // onClick={handlePhoto}
            />
          </div>
          <h3 className="profile__name">{user?.displayName}</h3>
          {user?.email.includes("@nsut.ac.in") === true ? (
            <div className="text-right">
              <EditIcon
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={handleOpenModal}
              />
            </div>
          ) : (
            ""
          )}

          {user?.email.includes("@nsut.ac.in") === false ? (
            <h1 className="text-danger">Guest</h1>
          ) : (
            <>
              <div className="row align-items-center">
                <h6 className="col-5  profile__info">
                  Expected year of Graduation
                </h6>
                <h6 className="col-1 profile__info">:</h6>
                <h6 className="col-5 text-primary profile__info">
                  {profile?.year}
                </h6>
              </div>
              <div className="row align-items-center">
                <h6 className="col-5  profile__info">Branch</h6>
                <h6 className="col-1 profile__info">:</h6>
                <h6 className="col-5 text-danger profile__info">
                  {profile?.branch}
                </h6>
              </div>
              <div className="row align-items-center">
                <h6 className="col-5  profile__info">Section</h6>
                <h6 className="col-1 profile__info">:</h6>
                <h6 className="col-5 text-primary profile__info">
                  {profile?.section}
                </h6>
              </div>

              <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>
            </>
          )}
          <div
            className="pt-2"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              onClick={() => auth.signOut()}
              type="button"
              className="btn btn-dark"
            >
              Logout
            </button>
            {user.emailVerified === false ? (
              <>
                <Tooltip title="Verify Your Email Id here">
                  <VerifiedUserIcon
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={handleVerification}
                  />
                </Tooltip>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
