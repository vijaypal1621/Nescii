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
      <Switch>
        <Route exact path="/societies/:societyId" component={SocietyChat} />
        <Route path="/" component={SocietyDefault} />
      </Switch>
    </Router>
  );
}

export default Society;
