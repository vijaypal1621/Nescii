// import { Message } from '@material-ui/icons';
import React from 'react';
import './Feed.css';
import MessageSender from './MessageSender';
import Post from './Post';
function Feed() {
    return (
        <div className="feed">
            <MessageSender />
            <Post 
            profilePic='https://s.yimg.com/fz/api/res/1.2/lX1NI08tfA8zoS_91rRWrQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTE4MDtxPTgwO3c9MTgw/https://s.yimg.com/zb/imgv1/22245df6-eb54-33c3-b1ff-64f879f287bf/t_500x300' 
            message='Two Talented students updated their college website'
            timestamp='This is a Test timestamp'
            username='nescii'
            image='http://en.wikipedia.org/wiki/Special:FilePath/Netaji_Subhas_University_of_Technology.svg'
            />
            <Post 
            profilePic='https://lh3.googleusercontent.com/a-/AOh14Gh95KiyNVSSbq7jC1c5nNE1XbCyP1yryz-OC8M7Xg=s96-c-rg-br100' 
            message='This gonna be insane this season'
            timestamp='This is a Test timestamp'
            username='Vijay PAL'
            image='https://ipl2020schedule.co.in/wp-content/uploads/2019/07/Vivo-IPL-2020-Schedule.jpg'
            />
            <Post 
            profilePic='https://lh3.googleusercontent.com/a-/AOh14Gh95KiyNVSSbq7jC1c5nNE1XbCyP1yryz-OC8M7Xg=s96-c-rg-br100' 
            message='This is a test Message'
            timestamp='This is a Test timestamp'
            username='Vijay PAL'
            
            />

        </div>
    )
}

export default Feed;

