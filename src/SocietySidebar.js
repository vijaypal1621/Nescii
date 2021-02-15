import {
  IconButton,
  Modal,
  InputAdornment,
  TextField,
  InputLabel,
  Button,
  Snackbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./SocietySidebar.css";
import SocietySidebarOption from "./SocietySidebarOption";
import AddIcon from "@material-ui/icons/Add";
import { AccountCircle, Facebook, Instagram } from "@material-ui/icons";
import db from "./firebase";
import MuiAlert from "@material-ui/lab/Alert";
import emailjs, { init } from "emailjs-com";
init("user_u87cckXVKEo0jLw2yaOzv");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SocietySidebar() {
  const [successfulSnackOpen, setSuccessfulSnackOpen] = useState(false);

  const handleSuccessfulSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessfulSnackOpen(false);
  };
  const [unsuccessfulSnackOpen, setUnsuccessfulSnackOpen] = useState(false);

  const handleUnsuccessfulSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setUnsuccessfulSnackOpen(false);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [name, setName] = useState("");
  const [prez, setPrez] = useState("");
  const [prof, setProf] = useState("");
  const [description, setDescription] = useState("");
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");
  const [logo, setLogo] = useState(null);
  const [adminLetter, setAdminLetter] = useState(null);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // run this code ONCE when society sidebar component loads
    db.collection("societies").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          imageURL: doc.data().imageURL,
        }))
      )
    );
  }, []); //whenever name inside the "[]" changes

  return (
    <>
      <Snackbar
        open={successfulSnackOpen}
        autoHideDuration={6000}
        onClose={handleSuccessfulSnackClose}
      >
        <Alert onClose={handleSuccessfulSnackClose} severity="success">
          Form filled successfully.
        </Alert>
      </Snackbar>
      <Snackbar
        open={unsuccessfulSnackOpen}
        autoHideDuration={6000}
        onClose={handleUnsuccessfulSnackClose}
      >
        <Alert onClose={handleUnsuccessfulSnackClose} severity="error">
          Error submitting form. Try again!
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
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
            id="socRegForm"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              const logoDataUrl = (file) =>
                new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = (error) => reject(error);
                })
                  .then((url) => {
                    template.logo = url;
                  })
                  .catch((error) => {
                    console.log(error);
                  });

              const adminLetterDataUrl = (file) =>
                new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = (error) => reject(error);
                })
                  .then((url) => {
                    template.adminLetter = url;
                  })
                  .catch((error) => {
                    console.log(error);
                  });

              var template = {
                name: name,
                description: description,
                prez: prez,
                prof: prof,
                fb: fb,
                insta: insta,
                user_name: "test User",
              };
              logoDataUrl(logo);
              adminLetterDataUrl(adminLetter);
              emailjs
                .send(
                  "service_lfsk51j",
                  "soc_reg_form",
                  template,
                  "user_u87cckXVKEo0jLw2yaOzv"
                )
                .then(
                  function (response) {
                    console.log("SUCCESS!", response.status, response.text);
                    setSuccessfulSnackOpen(true);
                  },
                  function (error) {
                    console.log("FAILED...", error);
                    setUnsuccessfulSnackOpen(true);
                  }
                );
              handleClose();
            }}
          >
            <div>
              <h1>
                <center>Register your Society with Us!</center>
              </h1>
              <TextField
                name="name"
                color="secondary"
                fullWidth
                id="name"
                label="Name of the Society"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <TextField
                name="description"
                color="secondary"
                margin="normal"
                fullWidth
                id="description"
                multiline
                label="Description"
                helperText="Minimum 50 words"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />

              <TextField
                name="prof"
                color="secondary"
                margin="normal"
                fullWidth
                id="prof"
                label="Name of the Professor In-Charge"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                required
                value={prof}
                onChange={(e) => {
                  setProf(e.target.value);
                }}
              />
              <TextField
                name="prez"
                color="secondary"
                margin="normal"
                fullWidth
                id="prez"
                label="Name of the Society President"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                required
                value={prez}
                onChange={(e) => {
                  setPrez(e.target.value);
                }}
              />
              <br />
              <br />
              <InputLabel shrink htmlFor="logo">
                Logo of the Society
              </InputLabel>
              <input
                type="file"
                id="logo"
                accept="image/*"
                required="true"
                name="logo"
                onChange={(e) => setLogo(e.target.files[0])}
              ></input>
              <br />
              <br />
              <InputLabel shrink htmlFor="adminLetter">
                Admin Letter
              </InputLabel>
              <input
                type="file"
                id="adminLetter"
                accept="image/*"
                name="adminLetter"
                required="true"
                onChange={(e) => setAdminLetter(e.target.files[0])}
              ></input>
              <br />
              <br />
              <TextField
                color="secondary"
                margin="normal"
                fullWidth
                id="fb"
                name="fb"
                label="Facebook Page URL"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Facebook />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setFb(e.target.value);
                }}
              />
              <TextField
                color="secondary"
                margin="normal"
                fullWidth
                name="insta"
                id="instagram"
                label="Instagram Page URL"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Instagram />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setInsta(e.target.value);
                }}
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
      <List className="society-sidebar">
        <ListItem key="add">
          <ListItemIcon>
            <IconButton style={{ marginLeft: "100%" }}>
              <AddIcon className="add__button" onClick={handleOpen} />
            </IconButton>
          </ListItemIcon>
        </ListItem>
        <Divider />
        {channels.map((channel) => (
          <>
            <SocietySidebarOption
              title={channel.title}
              id={channel.id}
              key={channel.id}
              url={channel.imageURL}
            />
            <Divider />
          </>
        ))}
      </List>
    </>
  );
}

export default SocietySidebar;
