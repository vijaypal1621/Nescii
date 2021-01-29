import React, { useState } from "react";
import SocietySidebar from "./SocietySidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SocietyChat from "./SocietyChat";
import SocietyDefault from "./SocietyDefault";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Drawer } from "@material-ui/core";

function Society() {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <SocietySidebar />
    </div>
  );

  return (
    <Router>
      <div className="society container">
        <div className="row">
          <IconButton
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
          <Drawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <div className="col-12">
            <Switch>
              <Route
                exact
                path="/societies/:societyId"
                component={SocietyChat}
              />
              <Route path="/" component={SocietyDefault} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Society;
