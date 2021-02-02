import { Avatar, InputLabel, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState,useEffect } from "react";
import "./Sidebar.css";
import { useStateValue } from "./StateProvider";
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
  const modalClasses = useModalStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [{ user }] = useStateValue();
  const [profile,setProfile] = useState(null);
  const [photo,setPhoto] = useState(user?.photoURL);
  const [branch,setBranch]=useState('');
  const [year,setYear]=useState('');
  const [section,setSection]=useState('');
  
        useEffect(() => {
          if(user?.email.includes('gmail')===false){
            db
            .collection('users')
            .doc(user?.uid)
            .onSnapshot((snapshot)=>{ setProfile(snapshot.data());})
              
          }
          },
       [user?.email, user?.uid])

  const openModal = () =>{
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

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
      setOpen(false);
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
        <InputLabel shrink htmlFor="postImage">
            Photo
        </InputLabel>
        <input accept="image/*" id="postImage" type="file" onChange={(e)=>setPhoto(e.target.value)} />
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
            <Avatar
              alt={user?.displayName}
              src={user?.photoURL}
              className={classes.large}
            />
          </div>
          <h3 className="profile__name">{user?.displayName}</h3>
          <h4 className="profile__sem">{profile?.year}</h4>
          <h4 className="profile__sem">{profile?.branch}</h4>
          <h4 className="profile__sem">{profile?.section}</h4>

          <EditIcon onClick={openModal} />
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
