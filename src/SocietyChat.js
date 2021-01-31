import React, { useState, useEffect } from "react";
import SocietyMessageSender from "./SocietyMessageSender";
import SocietyPost from "./SocietyPost";
import Widgets from "./Widgets";
import { useParams } from "react-router-dom";
import db from "./firebase";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Drawer } from "@material-ui/core";
import SocietySidebar from "./SocietySidebar";

function SocietyChat() {
  const { societyId } = useParams();
  const [societyDetails, setSocietyDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };
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
        .orderBy("timestamp", "asc")
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
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        <SocietySidebar />
      </Drawer>
      <IconButton
        id="hamburger"
        style={{
          position: "relative",
          left: "0",
          top: "0",
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
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <SocietyMessageSender />
            {posts.map(({ post, id }) => (
              <SocietyPost
                postId={id}
                message={post.message}
                timestamp={post.timestamp}
                username={post.username}
                profilePic={post.profilePic}
                image={post.image}
              />
            ))}
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
