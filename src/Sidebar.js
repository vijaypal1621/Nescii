import { Avatar, InputLabel, Modal, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState,useEffect, useRef } from "react";
import "./Sidebar.css";
import { useStateValue } from "./StateProvider";
import Popover from '@material-ui/core/Popover';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from "@material-ui/core";
import { auth } from "./firebase";
import {db} from './firebase';

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
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Sidebar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const modalClasses = useModalStyles();
  const ref = useRef(null)
  const [modalStyle] = React.useState(getModalStyle);
  const [openModal, setOpenModal] = React.useState(false);
  const [{ user }] = useStateValue();
  const [profile,setProfile] = useState(null);
  const [photo,setPhoto] = useState(user?.photoURL);
  const [branch,setBranch]=useState('');
  const [year,setYear]=useState('');
  const [section,setSection]=useState('');


  const handlePopClick = (event) => {
    if(user?.email.includes('gmail')===false){
      setAnchorEl(event.currentTarget);
    }
    
    
  };
  const handlePopClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
        useEffect(() => {
          if(user?.email.includes('gmail')===false){
            db
            .collection('users')
            .doc(user?.uid)
            .onSnapshot((snapshot)=>{ setProfile(snapshot.data());})
              
          }
          },
       [user?.email, user?.uid])

  const handleOpenModal = () =>{
    setOpenModal(true);
  }
  const handleClose = () => {
    setOpenModal(false);
  };

  const handlePhotoUpdate = () =>{
    
  }


  const handleUpdate = (e) => {
    e.preventDefault();
      db
      .collection('users')
      .doc(user?.uid)
        .update({
          year: year,
          branch:branch,
          section:section,
        });
      setBranch('');
      setSection('');
      setYear('');
      setOpenModal(false);
  };
  const body = (
    <div style={modalStyle} className={modalClasses.paper}>
    <div className="">
          <InputLabel shrink htmlFor="branch">
            Branch
          </InputLabel>
        <input value={branch} id="branch" onChange={(e)=>setBranch(e.target.value)} />
        <InputLabel shrink htmlFor="Year">
            Expected Year of Graduation
          </InputLabel>
        <input value={year} id="year"  onChange={(e)=>setYear(e.target.value)}/>
        <InputLabel shrink htmlFor="section">
            Section
          </InputLabel>
        <input value={section} id="section" onChange={(e)=>setSection(e.target.value)} />
        <Button style={{ color: "white", backgroundColor: "#16a596" }} onClick={handleUpdate}>Update</Button>
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
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
        <InputLabel shrink htmlFor="postImage">
            Photo
        </InputLabel>
        <input accept="image/*" id="postImage" type="file" onChange={(e)=>setPhoto(e.target.value)} />
        <Button style={{ color: "white", backgroundColor: "#16a596" }} onClick={handlePhotoUpdate}>Update</Button>
        </Typography>
      </Popover>
            <Avatar
              alt={user?.displayName}
              src={user?.photoURL}
              ref={ref}
              className={classes.large}
              aria-describedby={id} variant="contained" color="primary" onClick={handlePopClick}
              // onClick={handlePhoto}
            />
          </div>
          <h3 className="profile__name">{user?.displayName}</h3>
          {user?.email.includes('gmail')===true ? (
            <h1>Guest</h1>
          ) : (
            <>
          <div className="row">
              <h6 className="col-5 text-left pl-2 profile__info">Expected year of Graduation </h6>
              <p  className="col-1 profile__info">:</p>
              <h6 className="col-5 profile__info">{profile?.year}</h6>
          </div>
          <div className="row">
                <h6 className="col-5 text-left pl-2 profile__info">Branch</h6>
                <p  className="col-1 profile__info">:</p>
                <h6 className="col-5 profile__info">{profile?.branch}</h6>
          </div>
          <div className="row">
                <h6 className="col-5 text-left pl-2 profile__info">Section</h6>
                <p  className="col-1 profile__info">:</p>
                <h6 className="col-5 profile__info">{profile?.section}</h6>
          </div>
          <EditIcon onClick={handleOpenModal} />
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

          
          <Button onClick={() => auth.signOut()}>Logout</Button>
          {/* <Button aria-describedby={id} variant="contained" color="primary" onClick={handlePopClick}>
        Open Popover
      </Button> */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
