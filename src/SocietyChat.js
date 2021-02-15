import React, { useState, useEffect } from "react";
import SocietyMessageSender from "./SocietyMessageSender";
import SocietyPost from "./SocietyPost";
import Widgets from "./Widgets";
import { useParams } from "react-router-dom";
import db from "./firebase";
import SocietySidebar from "./SocietySidebar";

function SocietyChat() {
  const { societyId } = useParams();
  const [societyDetails, setSocietyDetails] = useState(null);
  const [posts, setPosts] = useState([]);

  //    1. changes URL with useHistory() Hook
  //    2. connects to databse using useEffect() and listens to the state changes using useState() hhok
  //    3. Uses URL by useParams(roomId) to fetch room details from the database!
  //    4. useHistory() and useParams() are from react-router-dom
  //    5. useEffect() and useState() are fom react;

  useEffect(() => {
    if (societyId) {
      db.collection("societies")
        .doc(societyId)
        .onSnapshot((snapshot) => setSocietyDetails(snapshot.data()));
      db.collection("societies")
        .doc(societyId)
        .collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          )
        );
    }
  }, [societyId]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 d-md-block d-none p-0">
            <SocietySidebar />
          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12">
                <SocietyMessageSender title={societyDetails?.title} imageURL={societyDetails?.imageURL} />
              </div>
              <div className="col-12">
                {posts.map(({ post, id }) => (
                  <SocietyPost
                    postId={id}
                    uid={post.uid}
                    message={post.message}
                    timestamp={post.timestamp}
                    username={post.username}
                    profilePic={post.profilePic}
                    images={post.images}
                    video={post.video}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <Widgets society={societyDetails} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SocietyChat;
