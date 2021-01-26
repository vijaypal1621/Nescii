import React from "react";
import SocietySidebar from "./SocietySidebar";
import "./Society.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SocietyChat from "./SocietyChat";

function Society() {
  return (
    <div className="society" style={{ display: "flex", flex: "1" }}>
      <Router>
        <div style={{ flex: 0.1 }}>
          <SocietySidebar />
        </div>
        <Switch>
          <Route exact path="/societies/:societyId">
            <SocietyChat />
          </Route>
          <Route path="/">
            <h1>hello</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Society;
