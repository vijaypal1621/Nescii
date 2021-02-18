import React, { useState, useEffect } from "react";
import SocietyMessageSender from "./SocietyMessageSender";
import SocietyPost from "./SocietyPost";
import Widgets from "./Widgets";
import { useParams } from "react-router-dom";
import db from "./firebase";
import SocietySidebar from "./SocietySidebar";
import { Button, Drawer } from "@material-ui/core";
import Events from "./Events";
import WidgetAbout from "./WidgetAbout";

function SocietyChat() {
  const { societyId } = useParams();
  const [societyDetails, setSocietyDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [socs, setSocs] = useState(false);
  const [about, setAbout] = useState(false);
  const [events, setEvents] = useState(false);

  const toggleAboutDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAbout(open);
  };

  const toggleEventsDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setEvents(open);
  };

  const toggleSocDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSocs(open);
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
      <Drawer
        anchor="left"
        open={socs}
        onClick={toggleSocDrawer(false)}
        onClose={toggleSocDrawer(false)}
      >
        <SocietySidebar />
      </Drawer>
      <Drawer
        anchor="top"
        open={about}
        onClick={toggleAboutDrawer(false)}
        onClose={toggleAboutDrawer(false)}
      >
        <WidgetAbout society={societyDetails} />
      </Drawer>
      <Drawer
        anchor="right"
        open={events}
        onClick={toggleEventsDrawer(false)}
        onClose={toggleEventsDrawer(false)}
      >
        <Events />
      </Drawer>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 d-block d-md-none pt-3">
            <center>
              <Button
                onClick={toggleSocDrawer(true)}
                variant="contained"
                color="primary"
              >
                Societies
              </Button>
            </center>
          </div>
          <div className="col-4 d-block d-md-none pt-3">
            <center>
              <Button
                variant="contained"
                onClick={toggleAboutDrawer(true)}
                color="primary"
              >
                About
              </Button>
            </center>
          </div>
          <div className="col-4 d-block d-md-none pt-3">
            <center>
              <Button
                variant="contained"
                onClick={toggleEventsDrawer(true)}
                color="primary"
              >
                Events
              </Button>
            </center>
          </div>
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
                    likes={post?.likes}
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
          <div className="col-md-4 d-none d-md-block">
            <Widgets society={societyDetails} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SocietyChat;
