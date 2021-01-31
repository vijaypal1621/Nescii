import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SocietyChat from "./SocietyChat";
import SocietyDefault from "./SocietyDefault";

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
