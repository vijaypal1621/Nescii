import React, { useState, useEffect } from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input, TextField } from "@material-ui/core";
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
  };
  // https://drive.google.com/file/d/1lol0E4WlbCtPf4ZsczNcL8COq4srRSdo/view?usp=sharing

  return (
    <>
      <div className="login row ">
        <div className="login__container offset-2 col-8 col-md-4 offset-md-4">
          <img
            className="login__photo"
            src="https://drive.google.com/thumbnail?id=1lol0E4WlbCtPf4ZsczNcL8COq4srRSdo"
            alt=""
          />
          <Modal open={open} onClose={() => setOpen(false)}>
            <div style={modalStyle} className={classes.paper}>
              <form className="app__signup">
                <center>
                  <img
                    className="login__photo"
                    src="https://drive.google.com/thumbnail?id=1lol0E4WlbCtPf4ZsczNcL8COq4srRSdo"
                    alt="dd"
                  />
                </center>
                <TextField
                  style={{ width: "90%" }}
                  placeholder="Name"
                  type="text"
                  value={username}
                  margin="normal"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  style={{ width: "90%" }}
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                />
                <TextField
                  style={{ width: "90%" }}
                  placeholder="Password"
                  type="password"
                  value={password}
                  margin="normal"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  style={{ outlineWidth: "0", width: "99%" }}
                  type="submit"
                  onClick={signUp}
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </Modal>
          {/* <h1>Sign in to Nescii</h1> */}
          <div>
            <form className="app__signup">
              <TextField
                style={{ width: "90%" }}
                placeholder="Email"
                type="text"
                value={email}
                required
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <TextField
                style={{ width: "90%" }}
                placeholder="Password"
                type="password"
                value={password}
                margin="normal"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />

              <Button
                variant="contained"
                style={{ outlineWidth: "0" }}
                type="submit"
                onClick={signIn}
              >
                Sign In
              </Button>
            </form>
            <br />
            <br />

            <center>
              <h4
                style={{
                  width: "70%",
                  textAlign: "center",
                  borderBottom: "1px solid #000",
                  lineHeight: "0.1em",
                }}
              >
                <span style={{ backgroundColor: "#fff", padding: "0 10px" }}>
                  OR
                </span>
              </h4>
            </center>
            <br />
            <br />
          </div>
          <Button onClick={signInWithGoogle}>
            <img
              className="google__image"
              src="https://www.google.com/images/hpp/gsa_super_g-64.gif"
              alt=""
            />
            Sign In With Google
          </Button>
        </div>

        <div className="login__container offset-2 col-8 col-md-4 offset-md-4">
          <div className="app__loginContainer " style={{ textAlign: "left" }}>
            <Button
              style={{
                outlineWidth: "0",
                width: "99%",
                fontSize: "1rem",
                fontWeight: "bolder",
              }}
              onClick={() => setOpen(true)}
            >
              SignUp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
