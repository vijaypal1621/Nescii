import {
  IconButton,
  Modal,
  InputAdornment,
  TextField,
  InputLabel,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import "./SocietySidebar.css";
import SocietySidebarOption from "./SocietySidebarOption";
import AddIcon from "@material-ui/icons/Add";
import { AccountCircle, Facebook, Instagram } from "@material-ui/icons";

function SocietySidebar() {
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

  return (
    <>
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
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(
                name,
                prez,
                prof,
                description,
                fb,
                insta,
                logo,
                adminLetter
              );
              handleClose();
            }}
          >
            <div>
              <h1>
                <center>Hit Us Up!</center>
              </h1>
              <TextField
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
      <div className="society-sidebar">
        <IconButton style={{ marginLeft: "35%" }}>
          <AddIcon className="add__button" onClick={handleOpen} />
        </IconButton>
        <hr />
        <SocietySidebarOption
          url="https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj"
          title="Ashwamedh"
        />
        <hr />
        <SocietySidebarOption
          url="https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj"
          title="Crescendo"
        />
        <hr />
        <SocietySidebarOption
          url="https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj"
          title="Junoon"
        />
        <hr />
        <SocietySidebarOption
          url="https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj"
          title="Mirage"
        />
        <hr />
        <SocietySidebarOption
          url="https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj"
          title="Alliance"
        />
        <hr />
        <SocietySidebarOption
          url="https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj"
          title="Debsoc"
        />
        <hr />
        <SocietySidebarOption
          url="https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj"
          title="Capella"
        />
        <hr />
        <SocietySidebarOption
          url="https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj"
          title="Enactus"
        />
        <hr />
        <SocietySidebarOption
          url="https://yt3.ggpht.com/ytc/AAUvwnh2tXWXz84kQWn1D0thfl6EAl5PeiBe0FwA2BQEKw=s176-c-k-c0x00ffffff-no-rj"
          title="Quiz Club"
        />
        <hr />
      </div>
    </>
  );
}

export default SocietySidebar;
