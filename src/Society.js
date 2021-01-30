import React, { useState } from "react";
import SocietySidebar from "./SocietySidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SocietyChat from "./SocietyChat";
import SocietyDefault from "./SocietyDefault";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Drawer } from "@material-ui/core";

function Society() {
  return (
    <Router>
      {/* <IconButton
        id="hamburger"
        style={{
          position: "absolute",
          left: "0",
          backgroundColor: "#16A596",
          color: "white",
          padding: "1rem",
          marginTop: "0rem",
          borderRadius: "0%",
        }}
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon style={{ width: "2.5rem", height: "2.5rem" }} />
      </IconButton>
      */}

      <Switch>
        <Route exact path="/societies/:societyId" component={SocietyChat} />
        <Route path="/" component={SocietyDefault} />
      </Switch>
    </Router>
  );
}

export default Society;
