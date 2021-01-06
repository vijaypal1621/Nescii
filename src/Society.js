import React from 'react';
import SocietySidebar from './SocietySidebar';
import MessageSender from './MessageSender';
import Post from './Post';
import Feed from './Feed';
import Widgets from './Widgets';

function Society() {
    return (
        <div className='society' style={{'display':'flex'}}>
            <SocietySidebar />
            {/* <MessageSender />
            <Post profilePic='https://lh3.googleusercontent.com/a-/AOh14Gh95KiyNVSSbq7jC1c5nNE1XbCyP1yryz-OC8M7Xg=s96-c-rg-br100' 
            message='This gonna be insane this season'
            timestamp='This is a Test timestamp'
            username='Vijay PAL'
            image='https://ipl2020schedule.co.in/wp-content/uploads/2019/07/Vivo-IPL-2020-Schedule.jpg' /> */}
            <Feed />
            <Widgets />
        </div>
    )

// import React from "react";
// import SocietySidebar from "./SocietySidebar";

// function Society() {
//   return (
//     <div className="society" style={{ display: "flex" }}>
//       <SocietySidebar />
//     </div>
//   );
// >>>>>>> 0b970bc7291de8efa1d5a019de5bd2c69971de0c
}

export default Society;
