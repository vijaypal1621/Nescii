import React from "react";
import SocietySidebar from "./SocietySidebar";
import Widgets from "./Widgets";
import SocietyMessageSender from "./SocietyMessageSender";
import SocietyPost from "./SocietyPost";
import "./Society.css";
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import SocietyChat from './SocietyChat';

function Society() {
  return (
    <div className="society" style={{ display: "flex" }}>

        
                  {/* Sidebar */}
            <Router>                  
          <div style={{ flex: 0.1 }}>
            <SocietySidebar />
          </div>
            <Switch>
              <Route exact path="/rooms/:roomId">
                <SocietyChat/>
              </Route>
              <Route path="/">
                <SocietyChat/>
              </Route>
            </Switch>
          </Router>
          {/* React-Router ->chat-screen*/}
        



      

      
    </div>
  );
}

export default Society;
