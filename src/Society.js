import React from "react";
import SocietySidebar from "./SocietySidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";

function Society() {
  return (
    <div className="society" style={{ display: "flex" }}>
      <div style={{ flex: 0.1 }}>
        <SocietySidebar />
      </div>
      {/* <MessageSender />
            <Post profilePic='https://lh3.googleusercontent.com/a-/AOh14Gh95KiyNVSSbq7jC1c5nNE1XbCyP1yryz-OC8M7Xg=s96-c-rg-br100' 
            message='This gonna be insane this season'
            timestamp='This is a Test timestamp'
            username='Vijay PAL'
            image='https://ipl2020schedule.co.in/wp-content/uploads/2019/07/Vivo-IPL-2020-Schedule.jpg' /> */}
      <div style={{ flex: 0.5 }}>
        <Feed />
      </div>
      <div style={{ flex: 0.4 }}>
        <Widgets />
      </div>
    </div>
  );
}

export default Society;
