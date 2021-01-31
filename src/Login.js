import React, { useState, useEffect } from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Login() {
  const [state, dispatch] = useStateValue();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in..
        console.log(authUser.uid);
        setUser(authUser); // helps in persistence
      } else {
        //user has logged out..
        setUser(null);
      }
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      });
    });
  }, [dispatch, user, username]);

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };
  // https://drive.google.com/file/d/1lol0E4WlbCtPf4ZsczNcL8COq4srRSdo/view?usp=sharing
  
  return (
    <div className="login row ">
      <div className="login__container offset-1 col-10 col-md-4 offset-md-4">
        <img className="login__photo" src="https://drive.google.com/thumbnail?id=1lol0E4WlbCtPf4ZsczNcL8COq4srRSdo" alt="" />
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img className="login__photo"
                 src='https://drive.google.com/thumbnail?id=1lol0E4WlbCtPf4ZsczNcL8COq4srRSdo' alt='dd' />
              </center>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>
                Sign Up
              </Button>
            </form>
          </div>
        </Modal>
        <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img className="login__photo"
                 src='https://drive.google.com/thumbnail?id=1lol0E4WlbCtPf4ZsczNcL8COq4srRSdo' alt='' />
              </center>
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>
                Sign In
              </Button>
            </form>
          </div>
        </Modal>
        <h1>Sign in to Nescii</h1>
        <Button onClick={signInWithGoogle}>Sign In With Google</Button>
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>SignUp Dude....</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
