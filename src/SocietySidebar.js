import { IconButton, Modal, FormControl } from "@material-ui/core";
import React from "react";
import "./SocietySidebar.css";
import SocietySidebarOption from "./SocietySidebarOption";
import AddIcon from "@material-ui/icons/Add";

function SocietySidebar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div>
          <form></form>
        </div>
      </Modal>
      <div className="society-sidebar">
        <IconButton component="span">
          <AddIcon onClick={handleOpen} />
        </IconButton>
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
