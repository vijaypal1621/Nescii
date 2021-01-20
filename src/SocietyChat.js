import React,{useState,useEffect} from 'react';
import SocietyMessageSender from './SocietyMessageSender';
import SocietyPost from './SocietyPost';
import Widgets from './Widgets';
import { useParams} from 'react-router-dom';
import db from './firebase';


function SocietyChat() {

  const {societyId}  = useParams();
  const [societyDetails, setSocietyDetails] = useState(null);
  const [posts, setPosts] = useState([]);

//    1. changes URL with useHistory() Hook
//    2. connects to databse using useEffect() and listens to the state changes using useState() hhok
//    3. Uses URL by useParams(roomId) to fetch room details from the database!
//    4. useHistory() and useParams() are from react-router-dom
//    5. useEffect() and useState() are fom react;

      useEffect(() => {
        if(societyId){
            db.collection("societies")
              .doc(societyId)
              .onSnapshot( (snapshot)=> 
              setSocietyDetails(snapshot.data()) 
              )
              db.collection('societies').doc(societyId)
              .collection('posts')
              .orderBy('timestamp', 'asc')
              .onSnapshot((snapshot) => setPosts( 
                      snapshot.docs.map(doc => doc.data() )
                  )
              )
        }
        
        
      }, [societyId]);


    return (
        <>
            <div style={{ flex: 0.5 }} className="society__feed">
        <SocietyMessageSender />
        {posts.map(({image,message,profilePic,timestamp,username})=>(
                    <SocietyPost message={message}
                             timestamp={timestamp}
                             username={username}
                             profilePic={profilePic}
                             image={image} 
                    />
                ))}



        {/* <SocietyPost
          profilePic="https://lh3.googleusercontent.com/a-/AOh14Gh95KiyNVSSbq7jC1c5nNE1XbCyP1yryz-OC8M7Xg=s96-c-rg-br100"
          message="This gonna be insane this season"
          timestamp="This is a Test timestamp"
          username="Vijay PAL"
          image="https://ipl2020schedule.co.in/wp-content/uploads/2019/07/Vivo-IPL-2020-Schedule.jpg"
        />
        <SocietyPost
          profilePic="https://s.yimg.com/fz/api/res/1.2/lX1NI08tfA8zoS_91rRWrQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTE4MDtxPTgwO3c9MTgw/https://s.yimg.com/zb/imgv1/22245df6-eb54-33c3-b1ff-64f879f287bf/t_500x300"
          message="Two Talented students updated their college website"
          timestamp="This is a Test timestamp"
          username="nescii"
          image="http://en.wikipedia.org/wiki/Special:FilePath/Netaji_Subhas_University_of_Technology.svg"
        /> */}
      </div>

      <div style={{ flex: 0.4 }}>
        <Widgets />
      </div>
        </>
    )
}

export default SocietyChat
